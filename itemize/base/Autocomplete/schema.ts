const singleFilterSchema = {
  $id: "SingleFilterSchema",
  type: "object",
  patternProperties: {
    "^[A-Za-z_]+$": {},
  },
  additionalProperties: false,
};

const valueSchema = {
  $id: "ValueSchema",
  type: "object",
  properties: {
    type: {
      const: "value",
    },
    value: {
      type: "string",
    },
    i18n: {
      type: "object",
      patternProperties: {
        "^[A-Za-z-]+$": {
          type: "string",
        },
      },
    },
    filter: {
      $ref: "SingleFilterSchema",
    },
  },
  required: ["type", "value"],
  additionalProperties: false,
};

const filterSchema = {
  $id: "FilterSchema",
  type: "object",
  properties: {
    type: {
      const: "filter",
    },
    values: {
      type: "array",
      items: {
        $ref: "ValueSchema",
      },
    },
    filters: {
      type: "array",
      items: {
        $ref: "FilterSchema",
      },
    },
    filter: {
      $ref: "SingleFilterSchema",
    },
  },
  additionalProperties: false,
  required: ["type", "filter"],
};

export default {
  type: "object",
  definitions: {
    SingleFilterSchema: singleFilterSchema,
    ValueSchema: valueSchema,
    FilterSchema: filterSchema,
  },
  properties: {
    type: {
      const: "autocomplete",
    },
    values: {
      type: "array",
      items: {
        $ref: "ValueSchema",
      },
    },
    filters: {
      type: "array",
      items: {
        $ref: "FilterSchema",
      },
    },
  },
  additionalProperties: false,
  required: ["type"],
};
