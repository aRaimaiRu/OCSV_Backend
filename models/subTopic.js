const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const subSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    main: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
  },
  { _id: false }
);

const Sub = mongoose.model("SubTopic", subSchema);

const subValidateSchema = Joi.object({
  id: Joi.number().required(),
  main: Joi.number().required(),
  title: Joi.string().max(255).required(),
});

// function validateSub(sub) {
//   return subValidateSchema.validate(sub);
// }

exports.Sub = Sub;
exports.validateSub = subValidateSchema.validate;
exports.subJoiSchema = subValidateSchema;
exports.subSchema = subSchema;
