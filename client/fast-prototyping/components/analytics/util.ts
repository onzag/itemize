export function getTimeLegendAmountModifierFnFor(statVizs: string[]) {
  return (statViz: string, refViz: string, n: number) => {
    if (statVizs.includes(statViz) && refViz !== "count") {
      return (new Date(n * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
    }

    return n.toString();
  }
}

export function getTimeLegendAmountModifierFnForAllBut(statVizs: string[]) {
  return (statViz: string, refViz: string, n: number) => {
    if (!statVizs.includes(statViz) && refViz !== "count") {
      return (new Date(n * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
    }

    return n.toString();
  }
}