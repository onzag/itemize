import { loadLib } from "../../../../util";
import type { IElasticAnalyticsNumericStat, IElasticAnalyticsResponse, IElasticAnalyticsTermStats } from "../../../../server/services/elastic-analytics";
import ResourceLoader from "../../../components/resources/ResourceLoader";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  const svg = d3.select(chartSvgElement).append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

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

  var radius = Math.min(width, height) / 2 - margin;

  const color = d3.scaleOrdinal()
    .domain(Object.keys(membersWithVal))
    .range(d3.schemeSet2);

  // due to a bug in react getting corrupted
  // it has to be set this way
  setColorMap({ color: color });

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
  const barMarginX = margin * 2;
  const barMarginY = margin * 3;
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
    .range([0, width - (barMarginX * 2)])
    .domain(dataMemberLabels)
    .padding(0.2);

  svg.append("g")
    .attr("transform", "translate(0," + (height - (barMarginY * 2)) + ")")
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
    .range([height - (barMarginY * 2), 0]);
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
      return height - (barMarginY * 2) - y(d.value);
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
  subcategoryI18n?: (subcat: string) => string | React.ReactNode;
  refVizI18n?: (refViz: string) => string | React.ReactNode;
  statVizI18n?: (statViz: string) => string | React.ReactNode;
}

export type RawD3LogicFn = typeof pieChart;

export interface IChartBaseProps extends IBaseAnalyticsProps {
  type: "bar" | "pie" | RawD3LogicFn;
}

interface IFinalChartProps extends IChartBaseProps {
  data: IElasticAnalyticsResponse;
}

export interface IAnalyticsChartProps extends IChartBaseProps {
  src: string;
  loadingComponent?: React.ReactNode;
  failedComponent?: React.ReactNode;
}

export function AnalyticsChart(props: IAnalyticsChartProps) {
  const [d3loaded, setd3Loaded] = useState(false);

  useEffect(() => {
    (async () => {
      await loadLib("D3CDN", "https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js", () => {
        return !!(window as any).d3;
      });
      setd3Loaded(true);
    })();
  }, []);

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

const width = 600;
const height = 600;
const margin = 40;
function ChartBase(props: IFinalChartProps) {
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


  const data = useMemo(() => {
    let data = (props.data.dataStats[statViz] || props.data.stats[statViz]) as IElasticAnalyticsTermStats;

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

  useEffect(() => {
    if (data) {
      const d3 = (window as any).d3;

      d3.select(chartRef.current).select("*").remove();

      if (props.type === "pie") {
        pieChart(d3, chartRef.current, setColorFn, setSelected, {
          width,
          height,
          margin,
          data,
          refViz: refViz,
          statViz: statViz,
          refVizModifier: props.refVizModifier,
          termDisplayModifier: props.termDisplayModifier,
          amountDisplayModifier: props.amountDisplayModifier,
        });
      } else if (props.type === "bar") {
        barChart(d3, chartRef.current, setColorFn, setSelected, {
          width,
          height,
          margin,
          data,
          refViz: refViz,
          statViz: statViz,
          refVizModifier: props.refVizModifier,
          termDisplayModifier: props.termDisplayModifier,
          amountDisplayModifier: props.amountDisplayModifier,
        });
      } else {
        props.type(d3, chartRef.current, setColorFn, setSelected, {
          width,
          height,
          margin,
          data,
          refViz: refViz,
          statViz: statViz,
          refVizModifier: props.refVizModifier,
          termDisplayModifier: props.termDisplayModifier,
          amountDisplayModifier: props.amountDisplayModifier,
        });
      }
    }
  }, [data, refViz, props.refVizModifier, props.termDisplayModifier, props.amountDisplayModifier, props.type, statViz]);

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
      {selectedInfo ? (
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
      ) : null}
    </>
  );
}