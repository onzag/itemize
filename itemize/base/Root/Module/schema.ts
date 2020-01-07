export default {
  type: "object",
  properties: {
    type: {
      const: "module",
    },
    includes: {
      type: "array",
      items: {
        type: "string",
      },
      minItems: 1,
    },
    readRoleAccess: {
      type: "array",
      items: {
        type: "string",
      },
    },
    searchable: {
      type: "boolean",
    },
  },
  required: ["type"],
};
