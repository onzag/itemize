/**
 * Contains the standard dependencies that the parent project
 * should have, these are either peers or used straight on
 * @packageDocumentation
 */

export default {
  // builder typescript that is ran after npm install
  "typescript": "^3.8.3",
  // tsconfig because typescript compiler doesn't get the paths right
  "tsconfig-paths": "^3.9.0",

  // peer dependencies
  "@types/react": "^16.9.53",
  "@types/react-dom": "^16.9.8",
  "react": "^16.14.0",
  "react-dom": "^16.14.0",
  "deep-equal": "^1.1.1",
};
