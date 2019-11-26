// The schema for the definition
// {
//   "amount": 4,
//   "type": "car"
// },
// properties can be any string
// the values must be boolean string or number
// we should have at least one
export default {
  $id: "PropertiesValueMappingDefiniton",
  type: "object",
  // oneOf: [
  //   {
  //     type: "object",
  //     properties: {
  //       property: {
  //         type: "string",
  //         pattern: "^[a-z_]+$",
  //       },
  //     },
  //     required: ["property"],
  //     additionalProperties: false,
  //   },
  //   {},
  // ],
  additionalProperties: {},
  minProperties: 1,
};
