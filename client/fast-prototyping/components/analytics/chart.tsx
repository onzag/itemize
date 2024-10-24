import { loadLib } from "../../../../util";
import type { IElasticAnalyticsNumericStat, IElasticAnalyticsResponse, IElasticAnalyticsTermStats } from "../../../../server/services/elastic-analytics";
import ResourceLoader from "../../../components/resources/ResourceLoader";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";

/**
 * Raw logic function for making a pie chart
 * @param d3 
 * @param chartSvgElement 
 * @param setColorMap 
 * @param setSelected 
 * @param data 
 * @returns 
 */
export function pieChart(
  d3: any,
  chartSvgElement: SVGSVGElement,
  setColorMap: (value: { color: { [key: string]: string } }) => void,
  setSelected: (value: string) => void,
  data: {
    width: number;
    height: number;
    margin: number;
    data: IElasticAnalyticsTermStats;
    statViz: string;
    refViz: string;
    refVizModifier?: (statViz: string, refViz: string, v: number, stat: IElasticAnalyticsNumericStat) => number;
    termDisplayModifier?: (statViz: string, k: string) => string;
    amountDisplayModifier?: (statViz: string, refViz: string, n: number) => string;
  }
) {
  // remove and clear old chart, we don't do animations
  d3.select(chartSvgElement).select("*").remove();

  // grab the svg and start on it
  const svg = d3.select(chartSvgElement).append("g")
    .attr("transform", "translate(" + data.width / 2 + "," + data.height / 2 + ")");

  // we build these members that will have the ratios
  const membersWithVal = {};
  let errored = false;
  Object.keys(data.data.members).forEach((memKey) => {
    if (errored) {
      return;
    }
    membersWithVal[memKey] = data.data.members[memKey][data.refViz];

    if (typeof membersWithVal[memKey] === "undefined") {
      console.warn("Tried to visualize statistics for " + data.statViz +
        " using the reference " + data.refViz + " but no such statistic is available");
      errored = true;
      return;
    }

    if (data.refVizModifier) {
      membersWithVal[memKey] = data.refVizModifier(data.statViz, data.refViz, membersWithVal[memKey], data.data.members[memKey]);
    }
  });

  if (errored) {
    return;
  }

  // calculate the radius of the pie
  const radius = Math.min(data.width, data.height) / 2 - data.margin;

  // make a color map
  const color = d3.scaleOrdinal()
    .domain(Object.keys(membersWithVal))
    .range(d3.schemeSet2);

  // due to a bug in react getting corrupted
  // it has to be set this way
  setColorMap({ color: color });

  // make the pie
  const pie = d3.pie()
    .value((d: any) => d[1]);

  const data_ready = pie(Object.entries(membersWithVal));

  const arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  svg
    .selectAll("path")
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', (d) => color(d.data[0]))
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
    .style("cursor", "pointer")
    .on("click", (d, i) => {
      setSelected(i.data[0]);
    });
}

/**
 * Raw logic function to making a bar chart
 * @param d3 
 * @param chartSvgElement 
 * @param setColorMap 
 * @param setSelected 
 * @param data 
 */
export function barChart(
  d3: any,
  chartSvgElement: SVGSVGElement,
  setColorMap: (value: { color: { [key: string]: string } }) => void,
  setSelected: (value: string) => void,
  data: {
    width: number;
    height: number;
    margin: number;
    data: IElasticAnalyticsTermStats;
    statViz: string;
    refViz: string;
    refVizModifier?: (statViz: string, refViz: string, v: number, stat: IElasticAnalyticsNumericStat) => number;
    termDisplayModifier?: (statViz: string, k: string) => string;
    amountDisplayModifier?: (statViz: string, refViz: string, n: number) => string;
  }
) {
  d3.select(chartSvgElement).select("*").remove();

  const barMarginX = data.margin * 2;
  const barMarginY = data.margin * 3;
  const svg = d3.select(chartSvgElement).append("g")
    .attr("transform",
      "translate(" + barMarginX + "," + barMarginY + ")");

  const dataMemberLabels = Object.keys(data.data.members);

  const dataSorted = dataMemberLabels.map((mKey) => {
    const returnable = { label: mKey, value: data.data.members[mKey][data.refViz] };

    if (data.refVizModifier) {
      returnable.value = data.refVizModifier(data.statViz, data.refViz, returnable.value, data.data.members[mKey]);
    }

    return returnable;
  }).sort((a, b) => b.value - a.value);

  const max = dataSorted.reduce((a, b) => a.value > b.value ? a : b);
  const min = dataSorted.reduce((a, b) => a.value < b.value ? a : b);

  const color = d3.scaleOrdinal()
    .domain(dataMemberLabels)
    .range(d3.schemeSet2);

  // due to a bug in react getting corrupted
  // it has to be set this way
  setColorMap({ color: color });

  const x = d3.scaleBand()
    .range([0, data.width - (barMarginX * 2)])
    .domain(dataMemberLabels)
    .padding(0.2);

  svg.append("g")
    .attr("transform", "translate(0," + (data.height - (barMarginY * 2)) + ")")
    .call(d3.axisBottom(x).tickFormat((n) => {
      if (data.termDisplayModifier) {
        return data.termDisplayModifier(data.statViz, n);
      }
      return n.toString();
    }))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  const y = d3.scaleLinear()
    .domain([min.value > 0 ? 0 : min.value, max.value])
    .range([data.height - (barMarginY * 2), 0]);
  svg.append("g")
    .call(d3.axisLeft(y).tickFormat((n) => {
      if (data.amountDisplayModifier) {
        return data.amountDisplayModifier(data.statViz, data.refViz, n);
      }
      return n.toString();
    }));

  svg.selectAll("mybar")
    .data(dataSorted)
    .enter()
    .append("rect")
    .attr("x", (d) => {
      return x(d.label);
    })
    .attr("y", (d) => {
      return y(d.value);
    })
    .attr("width", x.bandwidth())
    .attr("height", (d) => {
      return data.height - (barMarginY * 2) - y(d.value);
    })
    .attr("fill", (d) => {
      return color(d.label);
    })
    .style("cursor", "pointer")
    .on("click", (d, i) => {
      setSelected(i.label);
    });
}

export interface IBaseAnalyticsProps {
  /**
   * Represents the statistical value to be used for comparison, eg. context, language, etc...
   */
  statViz?: string;
  /**
   * If a stat viz is not specified a initial can be specified
   */
  initialStatViz?: string;
  /**
   * Represents the reference used for comparison, eg. max, min, avg
   */
  refViz?: string;
  /**
   * Modify the value given by the statistic in the given stat value
   * For example, the weight is given in seconds for tracking time, you may want to change it to hours
   * 
   * @param statViz
   * @param refViz 
   * @param v 
   * @param stat 
   * @returns 
   */
  refVizModifier?: (statViz: string, refViz: string, v: number, stat: IElasticAnalyticsNumericStat) => number;
  /**
   * Modifies the label of the given statistic so as long as such statistic represents terms value, for example
   * if "language" is a given statistic used as statViz and we are seeing the avg as refViz you may want to convert
   * these values into a more human readable form if they are iso codes
   * 
   * It doesn't do anything if the refViz is about, eg. count or just some numeric expression
   * 
   * @param statViz 
   * @param k 
   * @returns 
   */
  termDisplayModifier?: (statViz: string, k: string) => string;
  /**
   * This one modifies the given amount and how it is to be displayed
   * 
   * @param statViz 
   * @param refViz 
   * @param n 
   * @returns 
   */
  amountDisplayModifier?: (statViz: string, refViz: string, n: number) => string;
  /**
   * Similar to amountDisplayModifier but used in the legend instead
   * 
   * @param statViz 
   * @param refViz 
   * @param percent 
   * @param value 
   * @param stat 
   * @returns 
   */
  legendAmountDisplayModifier?: (statViz: string, refViz: string, percent: number, value: number, stat: IElasticAnalyticsNumericStat) => string;

  /**
   * The subcategory i18n specifies how to render each subcategory for language reasons
   * in the selector
   * 
   * @param subcat 
   * @returns a string or a react node with the language string
   */
  subcategoryI18n?: (subcat: string) => string | React.ReactNode;

  /**
   * The ref viz i18n specifies how to render each reference visualization for language reasons
   * eg. max, min, avg
   * 
   * @param refViz 
   * @returns a string or a react node with the language string
   */
  refVizI18n?: (refViz: string) => string | React.ReactNode;

  /**
   * the stat viz i18n specifies how to render each stat visualization for language reasons
   * 
   * @param statViz 
   * @returns a string or a react node with the language string
   */
  statVizI18n?: (statViz: string) => string | React.ReactNode;
}

export type RawD3LogicFn = typeof pieChart;

/**
 * Base props for the chart
 */
export interface IChartBaseProps extends IBaseAnalyticsProps {
  /**
   * type of the chart
   * - bar a bar chart
   * - pie a pie chart
   * 
   * or a raw logic function that you have to define
   * yourself how to render and execute using d3
   */
  type: "bar" | "pie" | RawD3LogicFn;
  /**
   * Similar to type but used in subcategories instead
   * specifying how to render each subcategory
   * and in timeliens how to render each time point breakdown
   */
  subcattype?: "bar" | "pie" | RawD3LogicFn;
  /**
   * width of the svg object
   */
  width?: number;
  /**
   * height of the svg object
   */
  height?: number;
  /**
   * margin of the svg object
   */
  margin?: number;
}

/**
 * Final property of the chart
 */
interface IFinalChartProps extends IChartBaseProps {
  /**
   * includes the data
   */
  data: IElasticAnalyticsResponse;
}

/**
 * Props for defining an analytics chart
 */
export interface IAnalyticsChartProps extends IChartBaseProps {
  /**
   * src url where the data is to be pulled, and it should be a exposed
   * analytics endpoint that the client can retrieve information from
   */
  src: string;
  /**
   * A component to show while the chart is loading
   */
  loadingComponent?: React.ReactNode;
  /**
   * A component to show if the data fails to load
   */
  failedComponent?: React.ReactNode;
}

/**
 * Internal: Given subcategory information it will convert such
 * to a response object style so it can be consumed by another chartbase
 * 
 * @param parentNumericStat the parent numeric stat where these substats where taken from
 * this could be the breakdown of all values of eg. chrome users, and they are also broken down by language (subcategories)
 * @returns 
 */
export function subcategoriesToResponse(
  parentNumericStat: IElasticAnalyticsNumericStat,
): IElasticAnalyticsResponse {
  // we build a response object
  const rs: IElasticAnalyticsResponse = {
    count: parentNumericStat.count,
    dataStats: {

    },
    stats: {
      weight: {
        avg: parentNumericStat.avg,
        count: parentNumericStat.count,
        max: parentNumericStat.avg,
        min: parentNumericStat.min,
        sum: parentNumericStat.sum,
      },
    },
    histogram: null,
  };

  // now we loop in the subcategories and add them to the stat or data stats
  // depending on where they come from
  Object.keys(parentNumericStat.subcategories).forEach((keyName) => {
    if (keyName.startsWith("data.")) {
      rs.dataStats[keyName.replace("data.", "")] = (parentNumericStat.subcategories[keyName] as IElasticAnalyticsTermStats);
    } else {
      rs.stats[keyName] = (parentNumericStat.subcategories[keyName] as IElasticAnalyticsTermStats);
    }
  });

  // return that
  return rs;
}

/**
 * The analytics chart component takes an endpoint that provides
 * analytics information and generates a chart from it
 * 
 * this chart will show general all time data, for displaying a timeline in analytics
 * information that support timeslices, see "timeline" component for analytics
 * 
 * @param props the props to build the chart
 * @returns 
 */
export function AnalyticsChart(props: IAnalyticsChartProps) {
  // to track to load d3
  const [d3loaded, setd3Loaded] = useState(false);

  // load using loadlib as effect
  useEffect(() => {
    (async () => {
      await loadLib("D3CDN", "https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js", () => {
        return !!(window as any).d3;
      });
      setd3Loaded(true);
    })();
  }, []);

  // and now we can use our resource loader
  return (
    <ResourceLoader
      path="/rest/service/stats"
      src={props.src}
      includeToken={true}
      type="json"
    >
      {(data: IElasticAnalyticsResponse, loading, failed) => {
        if (data && d3loaded) {
          return (<ChartBase data={data} statViz={props.statViz}
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

const dwidth = 600;
const dheight = 600;
const dmargin = 40;
/**
 * The chart base component build the chart but also needs the data instead
 * of the url and other information
 * 
 * @param props 
 * @returns 
 */
export function ChartBase(props: IFinalChartProps) {
  const chartRef = useRef<SVGSVGElement>();
  const [colorFn, setColorFn] = useState(null as any);
  const [selected, setSelected] = useState(null as string);
  const [currentRefViz, setCurrentRefViz] = useState("sum" as string);
  const [currentStatViz, setCurrentStatViz] = useState(props.initialStatViz ? props.initialStatViz : (props.data.stats.context ? "context" : "weight"));

  // if the initial stat viz is changed or the data is changed we go back to the default
  useEffect(() => {
    // basically if there is a initial stat viz we go with that
    // otherwise we go for context or weight, whatever is available
    setCurrentStatViz(props.initialStatViz ? props.initialStatViz : (props.data.stats.context ? "context" : "weight"));
  }, [props.initialStatViz, props.data]);

  const updateCurrentStatViz = useCallback((k: string) => {
    setSelected(null);
    setCurrentStatViz(k);
  }, []);

  // make the ref viz according to the prop or the state
  const refViz = props.refViz || currentRefViz;
  const statViz = props.statViz || currentStatViz;

  // grab the data we are uding via a memo
  const data = useMemo(() => {
    if (!statViz) {
      return null;
    }
    let data = (props.data.dataStats[statViz] || props.data.stats[statViz]) as IElasticAnalyticsTermStats;

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

    return data;
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

  useEffect(() => {
    if (data) {
      const d3 = (window as any).d3;

      if (props.type === "pie") {
        pieChart(d3, chartRef.current, setColorFn, setSelected, {
          width: typeof props.width === "number" ? props.width : dwidth,
          height: typeof props.height === "number" ? props.height : dheight,
          margin: typeof props.margin === "number" ? props.margin : dmargin,
          data,
          refViz: refViz,
          statViz: statViz,
          refVizModifier: props.refVizModifier,
          termDisplayModifier: props.termDisplayModifier,
          amountDisplayModifier: props.amountDisplayModifier,
        });
      } else if (props.type === "bar") {
        barChart(d3, chartRef.current, setColorFn, setSelected, {
          width: typeof props.width === "number" ? props.width : dwidth,
          height: typeof props.height === "number" ? props.height : dheight,
          margin: typeof props.margin === "number" ? props.margin : dmargin,
          data,
          refViz: refViz,
          statViz: statViz,
          refVizModifier: props.refVizModifier,
          termDisplayModifier: props.termDisplayModifier,
          amountDisplayModifier: props.amountDisplayModifier,
        });
      } else {
        props.type(d3, chartRef.current, setColorFn, setSelected, {
          width: typeof props.width === "number" ? props.width : dwidth,
          height: typeof props.height === "number" ? props.height : dheight,
          margin: typeof props.margin === "number" ? props.margin : dmargin,
          data,
          refViz: refViz,
          statViz: statViz,
          refVizModifier: props.refVizModifier,
          termDisplayModifier: props.termDisplayModifier,
          amountDisplayModifier: props.amountDisplayModifier,
        });
      }
    }
  }, [
    data,
    refViz,
    props.refVizModifier,
    props.termDisplayModifier,
    props.amountDisplayModifier,
    props.type,
    statViz,
    props.width,
    props.height,
    props.margin,
  ]);

  const membersSorted = useMemo(() => {
    if (!colorFn) {
      return [];
    }

    let sum: number = 0;
    const sorted = Object.keys(data.members).map((k) => {
      sum += data.members[k][refViz];
      return {
        key: k,
        name: props.termDisplayModifier ? props.termDisplayModifier(statViz, k) : k,
        info: data.members[k],
        percent: null as number,
        color: colorFn.color(k),
        value: props.refVizModifier ? props.refVizModifier(statViz, refViz, data.members[k][refViz], data.members[k]) : data.members[k][refViz],
      }
    }).sort((a, b) => b.value - a.value);

    sorted.forEach((v) => {
      v.percent = Math.round((v.info[refViz] / sum) * 10000) / 100;
    });

    return sorted;
  }, [data, refViz, colorFn, statViz, props.refVizModifier, props.termDisplayModifier]);

  const selectedInfo = membersSorted.find((v) => v.key === selected);

  const [selectedSubCatToResponse, firstSubcat] = useMemo(() => {
    if (!selectedInfo || !selectedInfo.info || !selectedInfo.info.subcategories) {
      return [null, null];
    }
    const response = subcategoriesToResponse(selectedInfo.info);
    const firstSubcat = Object.keys(response.dataStats)[0];
    return [response, firstSubcat || null];
  }, [selectedInfo]);

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
              component="span"
              className="current-ref-viz"
              sx={{ color: k === refViz ? "red" : "black", fontWeight: k === refViz ? 800 : 500, cursor: "pointer" }}
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
        width={typeof props.width === "number" ? props.width : dwidth}
        height={typeof props.height === "number" ? props.height : dheight}
        ref={chartRef}
        viewBox={([0, 0, typeof props.width === "number" ? props.width : dwidth, typeof props.height === "number" ? props.height : dheight]).join(" ")}
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
    </>
  );
}