export default {
  type: "object",
  properties: {
    type: {
      const: "root",
    },
    includes: {
      type: "array",
      items: {
        type: "string",
      },
      minItems: 1,
    },
    autocompletes: {
      type: "array",
      items: {
        type: "string",
      },
    },
    i18n: {
      type: "string",
    },
  },
  additionalProperties: false,
  required: ["type", "i18n"],
};
