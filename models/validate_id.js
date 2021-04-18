const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
function validate_id(_id) {
  const schema = Joi.object({
    _id: Joi.objectId().required(),
  });

  return schema.validate(_id);
}
exports.validate_id = validate_id;
