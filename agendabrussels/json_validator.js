const Ajv = require("ajv").default;
const schema = require("./schema.json");
const collection = require("./parsehub_events.json");

const ajv = new Ajv();
const validate = ajv.compile(schema);

collection.events.forEach((parsehub_event, i) => {
  const valid = validate(parsehub_event);
  if (!valid) {
    console.log(i)
    console.log(validate.errors)
  }
});
console.log(collection.events.length)
