import { loadLib } from "../../../../util";
import type { IElasticAnalyticsNumericStat, IElasticAnalyticsResponse, IElasticAnalyticsTermStats } from "../../../../server/services/elastic-analytics";
import ResourceLoader from "../../../components/resources/ResourceLoader";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChartBase, IBaseAnalyticsProps, RawD3LogicFn, subcategoriesToResponse } from "./chart";
import Box from "@mui/material/Box";

export type RawD3LogicHistogramFn = typeof timelineChart;

/**
 * The timeline base properties to be extended by the base analytics
 */
export interface ITimelineBaseProps extends IBaseAnalyticsProps {
  /**
   * The type of the timeline, either just a basic timeline or
   * a custom logic function
   */
  type: "timeline" | RawD3LogicHistogramFn;
  /**
   * Type for subcategories that are given by the
   * subcategory selector (root level) that provides
   * general statistics of a given statistic group
   */
  subcattype?: "bar" | "pie" | RawD3LogicFn;
  /**
   * width for the timeline svg box
   */
  width?: number;
  /**
   * height of the timeline svg box
   */
  height?: number;
  /**
   * margin within the timeline svg box 
   */
  margin?: number;
}

/**
 * Final timeline properties that the timeline
 * takes but it's not exposed to the developer
 */
interface IFinaltimelineProps extends ITimelineBaseProps {
  /**
   * The data that was retrieved from the endpoint
   * elastic assumed
   */
  data: IElasticAnalyticsResponse;
}

/**
 * The props for the timeline chart
 */
export interface ITimelineProps extends ITimelineBaseProps {
  /**
   * The rest endpoint here to get the stats from
   */
  src: string;
  /**
   * The component to display while the data is loading
   */
  loadingComponent?: React.ReactNode;
  /**
   * The component to display if the data fails to load or if there
   * is no internet
   */
  failedComponent?: React.ReactNode;
  /**
   * The id of the timeslice to be used
   */
  timeslice: string;
  /**
   * The date from where the timeslice should start
   * if not provided it means until the beginning of time (aka since 1970)
   */
  from?: string | number | Date;
  /**
   * the date to where the timeslice should end
   * if not provided it means until now
   */
  to?: string | number | Date;
}

/**
 * Renders an analytics timeslice based on the given criteria
 * note how the from and to can be defined by the developer
 * and may need to be so depending on how the slice was defined
 * 
 * @param props 
 * @returns 
 */
export function AnalyticsTimeline(props: ITimelineProps) {
  const [d3loaded, setd3Loaded] = useState(false);

  useEffect(() => {
    (async () => {
      await loadLib("D3CDN", "https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js", () => {
        return !!(window as any).d3;
      });
      setd3Loaded(true);
    })();
  }, []);

  const fromAsDate = useMemo(() => props.from ? (new Date(props.from)).toISOString() : null, [props.from]);
  const toAsDate = useMemo(() => props.to ? (new Date(props.to)).toISOString() : null, [props.to]);

  const qs = useMemo(() => {
    let qs: string = "";
    qs += (props.src.includes("?") ? "&" : "?") + "timeslice=" + encodeURIComponent(props.timeslice);
    if (fromAsDate) {
      qs += "&from=" + encodeURIComponent(fromAsDate);
    }
    if (toAsDate) {
      qs += "&to=" + encodeURIComponent(toAsDate);
    }
    return qs;
  }, [fromAsDate, toAsDate, props.timeslice, props.src]);

  return (
    <ResourceLoader
      path="/rest/service/stats"
      src={props.src + qs}
      includeToken={true}
      type="json"
    >
      {(data: IElasticAnalyticsResponse, loading, failed) => {
        if (data && d3loaded) {
          return (<TimelineBase data={data} statViz={props.statViz}
            refViz={props.refViz} refVizModifier={props.refVizModifier}
            termDisplayModifier={props.termDisplayModifier}
            amountDisplayModifier={props.amountDisplayModifier}
            legendAmountDisplayModifier={props.legendAmountDisplayModifier} type={props.type}
            refVizI18n={props.refVizI18n}
            statVizI18n={props.statVizI18n}
          />);
        }

        if (props.failedComponent && failed) {
          return props.failedComponent;
        }

        return props.loadingComponent || null;
      }}
    </ResourceLoader>
  )
}

export interface ITimelineBaseHistogramPoint {
  data: IElasticAnalyticsTermStats;
  date: string;
  count: number;
}

export interface ITmelineBrokenDownHistogramPoint {
  date: string;
  value: number;
  original: ITimelineBaseHistogramPoint;
}

export function timelineChart(
  d3: any,
  chartSvgElement: SVGSVGElement,
  setColorMap: (value: { color: { [key: string]: string } }) => void,
  setSelected: (value: string) => void,
  setSelectedHistogramPoint: (point: ITimelineBaseHistogramPoint) => void,
  data: {
    width: number;
    height: number;
    margin: number;
    histogram: ITimelineBaseHistogramPoint[];
    data: IElasticAnalyticsTermStats;
    statViz: string;
    refViz: string;
    refVizModifier?: (statViz: string, refViz: string, v: number, stat: IElasticAnalyticsNumericStat) => number;
    termDisplayModifier?: (statViz: string, k: string) => string;
    amountDisplayModifier?: (statViz: string, refViz: string, n: number) => string;
  }
) {
  const svg = d3.select(chartSvgElement);
  svg.selectAll("*").remove();

  const x = d3.scaleTime()
    .domain(d3.extent(data.histogram, (d: ITimelineBaseHistogramPoint) => { return new Date(d.date) }))
    .range([data.margin, data.width - data.margin]);

  let max: number = null;
  let min: number = null;

  const histogramResult: { [memberKey: string]: ITmelineBrokenDownHistogramPoint[] } = {};

  data.histogram.forEach((m) => {
    Object.keys(data.data.members).map((memberKey) => {
      let rawValue: number = (m.data.members[memberKey] && m.data.members[memberKey][data.refViz]) || 0;
      if (data.refVizModifier) {
        rawValue = data.refVizModifier(
          data.statViz,
          data.refViz,
          rawValue,
          m.data.members[memberKey] || null,
        );
      }
      if (!histogramResult[memberKey]) {
        histogramResult[memberKey] = [];
      }
      histogramResult[memberKey].push({
        value: rawValue,
        date: m.date,
        original: m,
      });

      if (max === null || rawValue > max) {
        max = rawValue;
      }
      if (min === null || rawValue < min) {
        min = rawValue;
      }
    });
  });

  const color = d3.scaleOrdinal()
    .domain(Object.keys(histogramResult))
    .range(d3.schemeSet2);

  // due to a bug in react getting corrupted
  // it has to be set this way
  setColorMap({ color: color });

  const y = d3.scaleLinear()
    .domain([min, max])
    .range([data.height - data.margin, data.margin]);

  svg.append("g")
    .attr("transform", "translate(0," + (data.height - data.margin) + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", "translate(" + data.margin + ",0)")
    .call(d3.axisLeft(y).tickFormat((n) => {
      if (data.amountDisplayModifier) {
        return data.amountDisplayModifier(data.statViz, data.refViz, n);
      }
      return n.toString();
    }));

  Object.keys(histogramResult).forEach((memberKey) => {
    svg.append("path")
      .datum(histogramResult[memberKey])
      .attr("fill", "none")
      .attr("stroke", color(memberKey))
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.7)
      .attr("d", d3.line()
        .x((d: { value: number, date: string }) => { return x(new Date(d.date)) })
        .y((d: { value: number, date: string }) => { return y(d.value) })
      );
    // Add the points
    const circles = svg
      .append("g")
      .selectAll("dot")
      .data(histogramResult[memberKey])
      .enter()
      .append("circle")
      .attr("cx", (d: { value: number, date: string }) => { return x(new Date(d.date)) })
      .attr("cy", (d: { value: number, date: string }) => { return y(d.value) })
      .attr("r", 5)
      .attr("fill", color(memberKey))
      .attr("opacity", 0.7)
      .attr("style", "cursor:pointer");

    circles.on("click", (event, d) => {
      setSelectedHistogramPoint(d.original);
    });
  });
}

const dwidth = 600;
const dheight = 600;
const dmargin = 60;
function TimelineBase(props: IFinaltimelineProps) {
  const chartRef = useRef<SVGSVGElement>();
  const [colorFn, setColorFn] = useState(null as any);
  const [selected, setSelected] = useState(null as string);
  const [selectedHistogramPoint, setSelectedHistogramPoint] = useState(null as ITimelineBaseHistogramPoint);
  const [currentRefViz, setCurrentRefViz] = useState("sum" as string);
  const [currentStatViz, setCurrentStatViz] = useState(props.initialStatViz ? props.initialStatViz : (props.data.stats.context ? "context" : "weight"));
  useEffect(() => {
    setCurrentStatViz(props.initialStatViz ? props.initialStatViz : (props.data.stats.context ? "context" : "weight"));
  }, [props.initialStatViz, props.data]);

  const height = typeof props.height === "number" ? props.height : dheight;
  const width = typeof props.width === "number" ? props.width : dwidth;
  const margin = typeof props.margin === "number" ? props.margin : dmargin;

  const updateCurrentStatViz = useCallback((k: string) => {
    setSelected(null);
    setSelectedHistogramPoint(null);
    setCurrentStatViz(k);
  }, []);

  const refViz = props.refViz || currentRefViz;
  const statViz = props.statViz || currentStatViz;

  const histogram = useMemo<ITimelineBaseHistogramPoint[]>(() => {
    if (!statViz) {
      return null;
    }
    const internalHistogram = props.data.histogram.map((a) => {
      let data = (a.dataStats[statViz] || a.stats[statViz]) as IElasticAnalyticsTermStats;

      if (!data) {
        return null;
      }

      if (data && !data.members) {
        const dataAsNumeric = data as any as IElasticAnalyticsNumericStat;
        data = {
          leftout_count: 0,
          members: {
            "total": dataAsNumeric,
          },
        }
      }

      return {
        data,
        date: a.date,
        count: a.count,
      };
    });

    return internalHistogram;
  }, [props.data, statViz]);

  let availableStatViz: string[] = [];

  if (props.data && !props.statViz) {
    if (props.data.stats.context) {
      availableStatViz.push("context");
    }

    if (props.data.stats.weight) {
      availableStatViz.push("weight");
    }

    if (props.data.stats.users) {
      availableStatViz.push("users");
    }

    if (props.data.dataStats) {
      Object.keys(props.data.dataStats).filter((k) => {
        availableStatViz.push(k);
      });
    }
  }

  const dataReference = useMemo(() => {
    if (!statViz) {
      return null;
    }
    let dataReference = (props.data.dataStats[statViz] || props.data.stats[statViz]) as IElasticAnalyticsTermStats;

    if (dataReference && !dataReference.members) {
      const dataAsNumeric = dataReference as any as IElasticAnalyticsNumericStat;
      dataReference = {
        leftout_count: 0,
        members: {
          "total": dataAsNumeric,
        },
      }
    }
    return dataReference;
  }, [props.data, statViz])

  const membersSorted = useMemo(() => {
    if (!colorFn || !statViz) {
      return [];
    }

    let sum: number = 0;
    const sorted = Object.keys(dataReference.members).map((k) => {
      sum += dataReference.members[k][refViz];
      return {
        key: k,
        name: props.termDisplayModifier ? props.termDisplayModifier(statViz, k) : k,
        info: dataReference.members[k],
        percent: null as number,
        color: colorFn.color(k),
        value: props.refVizModifier ?
          props.refVizModifier(statViz, refViz, dataReference.members[k][refViz], dataReference.members[k]) : dataReference.members[k][refViz],
      }
    }).sort((a, b) => b.value - a.value);

    sorted.forEach((v) => {
      v.percent = Math.round((v.info[refViz] / sum) * 10000) / 100;
    });

    return sorted;
  }, [histogram, refViz, colorFn, statViz, props.refVizModifier, props.termDisplayModifier, dataReference]);

  useEffect(() => {
    if (histogram) {
      const d3 = (window as any).d3;

      if (props.type === "timeline") {
        timelineChart(d3, chartRef.current, setColorFn, setSelected, setSelectedHistogramPoint, {
          width: typeof props.width === "number" ? props.width : dwidth,
          height: typeof props.height === "number" ? props.height : dheight,
          margin: typeof props.margin === "number" ? props.margin : dmargin,
          histogram,
          data: dataReference,
          refViz: refViz,
          statViz: statViz,
          refVizModifier: props.refVizModifier,
          termDisplayModifier: props.termDisplayModifier,
          amountDisplayModifier: props.amountDisplayModifier,
        });
      } else {
        props.type(d3, chartRef.current, setColorFn, setSelected, setSelectedHistogramPoint, {
          width: typeof props.width === "number" ? props.width : dwidth,
          height: typeof props.height === "number" ? props.height : dheight,
          margin: typeof props.margin === "number" ? props.margin : dmargin,
          histogram,
          data: dataReference,
          refViz: refViz,
          statViz: statViz,
          refVizModifier: props.refVizModifier,
          termDisplayModifier: props.termDisplayModifier,
          amountDisplayModifier: props.amountDisplayModifier,
        });
      }
    }
  }, [histogram, refViz, props.refVizModifier, props.termDisplayModifier,
    props.amountDisplayModifier, props.type, statViz, dataReference, width, height, margin]);

  const selectedInfo = membersSorted.find((v) => v.key === selected);

  const [selectedSubCatToResponse, firstSubcat] = useMemo(() => {
    if (!selectedInfo || !selectedInfo.info || !selectedInfo.info.subcategories) {
      return [null, null];
    }
    const response = subcategoriesToResponse(selectedInfo.info);
    const firstSubcat = Object.keys(response.dataStats)[0];
    return [response, firstSubcat || null];
  }, [selectedInfo]);

  const selectedHistogramAsResponse = useMemo(() => {
    if (!selectedHistogramPoint) {
      return null;
    }
    const response: IElasticAnalyticsResponse = {
      count: selectedHistogramPoint.count,
      stats: {
        weight: null,
        context: selectedHistogramPoint.data,
      },
      dataStats: {},
      histogram: null,
    }
    return response;
  }, [selectedHistogramPoint]);

  return (
    <>
      {availableStatViz && availableStatViz.length ? <Box
        className="current-stat-viz-selector"
        sx={{ fontSize: "10px", display: "flex", rowGap: "2px", columnGap: "4px" }}
      >
        {availableStatViz.map((k) => {
          return (
            <Box
              component="span"
              sx={{ color: k === statViz ? "red" : "black", fontWeight: k === refViz ? 800 : 500, cursor: "pointer" }}
              onClick={updateCurrentStatViz.bind(null, k)}
              key={k}
              className="current-stat-viz"
            >
              {k}
            </Box>
          );
        })}
      </Box> : null}
      {props.refViz || !membersSorted[0] ? null : <Box
        className="current-ref-viz-selector"
        sx={{ fontSize: "10px", display: "flex", rowGap: "2px", columnGap: "4px" }}
      >
        {Object.keys(membersSorted[0].info).map((k) => {
          if (k === "subcategories") {
            return null;
          }
          return (
            <Box
              className="current-ref-viz"
              component="span"
              style={{ color: k === refViz ? "red" : "black", fontWeight: k === refViz ? 800 : 500, cursor: "pointer" }}
              onClick={setCurrentRefViz.bind(null, k)}
              key={k}
            >
              {k}
            </Box>
          );
        })}
      </Box>}
      <Box
        component="svg"
        className="svg-chart"
        width={width}
        height={height}
        ref={chartRef}
        viewBox={([0, 0, width, height]).join(" ")}
        sx={{ border: "solid 2px" }}
      ></Box>
      <div className="legend-container">
        {membersSorted.map((v) => {
          return (<Box
            key={v.key} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", columnGap: "10px", cursor: "pointer" }}
            className="legend-element"
            onClick={setSelected.bind(null, v.key)}
          >
            <Box sx={{ width: "20px", height: "20px", display: "inline-block", backgroundColor: v.color }} className="legend-color"></Box>
            <b>{v.name}</b> - {props.legendAmountDisplayModifier || props.amountDisplayModifier ?
              (props.legendAmountDisplayModifier ? props.legendAmountDisplayModifier(statViz, refViz, v.percent, v.value, v.info) :
                props.amountDisplayModifier(statViz, refViz, v.value)) : (v.percent + "%")}
          </Box>);
        })}
      </div>
      {selectedInfo ? (
        <Box sx={{ margin: "1rem", padding: "1rem" }} className="selected-stat-container">
          <div className="selected-stat-name"><b>{selectedInfo.name}</b></div>
          <div className="selected-stat-subcategory-container">
            {Object.keys(selectedInfo.info).map((k) => (
              k === "subcategories" ? null :
                <div key={k} className="selected-stat-subcategory">
                  {k}: {props.amountDisplayModifier && k !== "count" ? props.amountDisplayModifier(statViz, refViz, selectedInfo.info[k]) : selectedInfo.info[k]}
                </div>
            ))}
          </div>
          {selectedSubCatToResponse ? (
            <div className="selected-stat-chart-subcontainer">
              <ChartBase
                data={selectedSubCatToResponse}
                type={props.subcattype || "pie"}
                initialStatViz={firstSubcat}
                subcattype={props.subcattype}
                amountDisplayModifier={props.amountDisplayModifier}
                legendAmountDisplayModifier={props.legendAmountDisplayModifier}
                statVizI18n={props.statVizI18n}
                refVizI18n={props.refVizI18n}
              />
            </div>
          ) : null}
        </Box>
      ) : null}
      {selectedHistogramAsResponse ? (
        <Box sx={{ margin: "1rem", padding: "1rem" }} className="selected-histogram-stat-container">
          <div className="selected-histogram-point-chart-subcontainer">
            <ChartBase
              data={selectedHistogramAsResponse}
              type={props.subcattype || "pie"}
              statViz="context"
              subcattype={props.subcattype}
              amountDisplayModifier={props.amountDisplayModifier}
              legendAmountDisplayModifier={props.legendAmountDisplayModifier}
              statVizI18n={props.statVizI18n}
              refVizI18n={props.refVizI18n}
            />
          </div>
        </Box>
      ) : null}
    </>
  );
}