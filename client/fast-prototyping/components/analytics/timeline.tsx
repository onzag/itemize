import { loadLib } from "../../../../util";
import type { IElasticAnalyticsNumericStat, IElasticAnalyticsResponse, IElasticAnalyticsTermStats } from "../../../../server/services/elastic-analytics";
import ResourceLoader from "../../../components/resources/ResourceLoader";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IBaseAnalyticsProps } from "./chart";

export interface ITimelineBaseProps extends IBaseAnalyticsProps {
  type: "timeline";
}

interface IFinaltimelineProps extends ITimelineBaseProps {
  data: IElasticAnalyticsResponse;
}

export interface ITimelineProps extends ITimelineBaseProps {
  src: string;
  loadingComponent?: React.ReactNode;
  failedComponent?: React.ReactNode;
  from?: string | number | Date;
  to?: string | number | Date;
}

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
    let hasQs = props.src.includes("?");
    let qs: string = "";
    if (fromAsDate) {
      qs += (hasQs ? "&" : "?") + "from=" + encodeURIComponent(fromAsDate);
      hasQs = true;
    }
    if (toAsDate) {
      qs += (hasQs ? "&" : "?") + "to=" + encodeURIComponent(toAsDate);
      hasQs = true;
    }
    return qs;
  }, [fromAsDate, toAsDate, props.src]);

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
}

export interface ITmelineBrokenDownHistogramPoint {
  date: string;
  value: number;
}

const width = 600;
const height = 600;
const margin = 60;
function TimelineBase(props: IFinaltimelineProps) {
  const chartRef = useRef<SVGSVGElement>();
  const [colorFn, setColorFn] = useState(null as any);
  const [selected, setSelected] = useState(null as string);
  const [currentRefViz, setCurrentRefViz] = useState("sum" as string);
  const [currentStatViz, setCurrentStatViz] = useState("context" as string);

  const updateCurrentStatViz = useCallback((k: string) => {
    setSelected(null);
    setCurrentStatViz(k);
  }, []);

  const refViz = props.refViz || currentRefViz;
  const statViz = props.statViz || currentStatViz;

  const histogram = useMemo<ITimelineBaseHistogramPoint[]>(() => {
    const internalHistogram = props.data.histogram.map((a) => {
      let data = (a.dataStats[statViz] || a.stats[statViz]) as IElasticAnalyticsTermStats;

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
      };
    });

    return internalHistogram;
  }, [props.data, statViz]);

  let availableStatViz: string[] = [];

  if (props.data && !props.statViz) {
    if (props.data.stats) {
      availableStatViz = ["context", "weight"];

      if (props.data.stats.users) {
        availableStatViz.push("users");
      }
    }

    if (props.data.dataStats) {
      Object.keys(props.data.dataStats).filter((k) => {
        availableStatViz.push(k);
      });
    }
  }

  const dataReference = useMemo(() => {
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
    if (!colorFn) {
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

      const svg = d3.select(chartRef.current);
      svg.selectAll("*").remove();

      const x = d3.scaleTime()
        .domain(d3.extent(histogram, (d: ITimelineBaseHistogramPoint) => { return new Date(d.date) }))
        .range([margin, width - margin]);

      let max: number = null;
      let min: number = null;

      const histogramResult: { [memberKey: string]: ITmelineBrokenDownHistogramPoint[] } = {};

      histogram.forEach((m) => {
        Object.keys(dataReference.members).map((memberKey) => {
          let rawValue: number = (m.data.members[memberKey] && m.data.members[memberKey][refViz]) || 0;
          if (props.refVizModifier) {
            rawValue = props.refVizModifier(
              statViz,
              refViz,
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
      setColorFn({ color: color });

      const y = d3.scaleLinear()
        .domain([min, max])
        .range([height - margin, margin]);

      svg.append("g")
        .attr("transform", "translate(0," + (height - margin) + ")")
        .call(d3.axisBottom(x));

      svg.append("g")
        .attr("transform", "translate(" + margin + ",0)")
        .call(d3.axisLeft(y).tickFormat((n) => {
          if (props.amountDisplayModifier) {
            return props.amountDisplayModifier(statViz, refViz, n);
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
        svg
          .append("g")
          .selectAll("dot")
          .data(histogramResult[memberKey])
          .enter()
          .append("circle")
          .attr("cx", (d: { value: number, date: string }) => { return x(new Date(d.date)) })
          .attr("cy", (d: { value: number, date: string }) => { return y(d.value) })
          .attr("r", 5)
          .attr("fill", color(memberKey))
          .attr("opacity", 0.7);
      });
    }
  }, [histogram, refViz, props.refVizModifier, props.termDisplayModifier, props.amountDisplayModifier, props.type, statViz, dataReference]);

  const selectedInfo = membersSorted.find((v) => v.key === selected);

  return (
    <>
      {availableStatViz && availableStatViz.length ? <div style={{ fontSize: "10px", display: "flex", rowGap: "2px", columnGap: "4px" }}>
        {availableStatViz.map((k) => {
          return (
            <span
              style={{ color: k === statViz ? "red" : "black", fontWeight: k === refViz ? 800 : 500, cursor: "pointer" }}
              onClick={updateCurrentStatViz.bind(null, k)}
              key={k}
            >
              {k}
            </span>
          );
        })}
      </div> : null}
      {props.refViz || !membersSorted[0] ? null : <div style={{ fontSize: "10px", display: "flex", rowGap: "2px", columnGap: "4px" }}>
        {Object.keys(membersSorted[0].info).map((k) => {
          if (k === "subcategories") {
            return null;
          }
          return (
            <span
              style={{ color: k === refViz ? "red" : "black", fontWeight: k === refViz ? 800 : 500, cursor: "pointer" }}
              onClick={setCurrentRefViz.bind(null, k)}
              key={k}
            >
              {k}
            </span>
          );
        })}
      </div>}
      <svg
        width={width}
        height={height}
        ref={chartRef}
        viewBox={([0, 0, width, height]).join(" ")}
        style={{ border: "solid 2px" }}
      ></svg>
      <div>
        {membersSorted.map((v) => {
          return (<div
            key={v.key} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", columnGap: "10px", cursor: "pointer" }}
            onClick={setSelected.bind(null, v.key)}
          >
            <div style={{ width: "20px", height: "20px", display: "inline-block", backgroundColor: v.color }}></div>
            <b>{v.name}</b> - {props.legendAmountDisplayModifier || props.amountDisplayModifier ?
              (props.legendAmountDisplayModifier ? props.legendAmountDisplayModifier(statViz, refViz, v.percent, v.value, v.info) :
                props.amountDisplayModifier(statViz, refViz, v.value)) : (v.percent + "%")}
          </div>);
        })}
      </div>
      {/* {selectedInfo ? (
        <div style={{ margin: "1rem", padding: "1rem" }}>
          <div><b>{selectedInfo.name}</b></div>
          <div>
            {Object.keys(selectedInfo.info).map((k) => (
              k === "subcategories" ? null :
                <div key={k}>
                  {k}: {props.amountDisplayModifier && k !== "count" ? props.amountDisplayModifier(statViz, refViz, selectedInfo.info[k]) : selectedInfo.info[k]}
                </div>
            ))}
          </div>
          {selectedInfo.info.subcategories ? (
            Object.keys(selectedInfo.info.subcategories).map((v) => {
              <div>
                <div>{props.subcategoryI18n ? props.subcategoryI18n(v) : v}</div>
                <ChartBase
                  data={{
                    count: selectedInfo.info.count,
                    dataStats: selectedInfo.info.subcategories[v],
                    histogram: null,
                    stats: null,
                  }}
                  type="pie"
                  amountDisplayModifier={props.amountDisplayModifier}
                  legendAmountDisplayModifier={props.legendAmountDisplayModifier}
                  statVizI18n={props.statVizI18n}
                  refVizI18n={props.refVizI18n}
                />
              </div>
            })
          ) : null}
        </div>
      ) : null} */}
    </>
  );
}