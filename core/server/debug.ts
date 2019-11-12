import colors from "colors/safe";

function debug(...args: any[]) {
  console.debug.apply(console.debug, args);
}

// tslint:disable-next-line: no-empty
function doNothing(): void {}

export default function Debug(name: string): (...args: any[]) => void {
  if (process.env.NODE_ENV !== "production") {
    return debug.bind(null, colors.yellow(name) + ":");
  }
  return doNothing;
}
