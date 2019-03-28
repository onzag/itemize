export class HTMLElement {
  constructor(name: any, keyAttrs: any, rawAttrs: any);
  tagName: any;
  rawAttrs: any;
  childNodes: any;
  id: any;
  classNames: any;
  appendChild(node: any): any;
  querySelector(selector: any): any;
  querySelectorAll(selector: any): any;
  removeWhitespace(): any;
  trimRight(pattern: any): any;
}
export class Matcher {
  static flushCache(): void;
  constructor(selector: any);
  matchers: any;
  nextMatch: any;
  advance(el: any): any;
  reset(): void;
  rewind(): void;
}
export function Node(): void;
export namespace Node {
  const ELEMENT_NODE: number;
  const TEXT_NODE: number;
}
export class TextNode {
  constructor(value: any);
  rawText: any;
}
export function parse(data: any, options?: any): any;
