export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
export function escapeStringRegexp(str: string) {
  return str.replace(matchOperatorsRe, "\\$&");
}
