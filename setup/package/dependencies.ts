/**
 * Contains the standard dependencies that the parent project
 * should have, these are either peers or used straight on
 * @module
 */

export default {
  // builder typescript that is ran after npm install
  "typescript": "4.3.5",
  // tsconfig because typescript compiler doesn't get the paths right
  "tsconfig-paths": "^3.10.1",

  // peer dependencies
  "@types/react-dom": "^17.0.11",
  "@types/react": "^17.0.38",
  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "deep-equal": "^1.1.1",
};
