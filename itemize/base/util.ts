import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

export const DOMWindow = JSDOM ? (new JSDOM("")).window : window;
export const DOMPurify = createDOMPurify(DOMWindow);
