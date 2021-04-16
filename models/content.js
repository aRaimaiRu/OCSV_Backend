const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
  },
  sub: {
    type: Number,
  },
  contentType: {
    type: String,
    maxlength: 32,
  },
  Explain: {
    type: String,
    maxlength: 2048,
  },
  outLink: {
    type: String,
    maxlength: 2048,
  },
  Answer: [Number],
  Choice: [String],
  Picture: [String],
});

const Content = mongoose.model("Content", contentSchema);
const schema = Joi.object({
  id: Joi.number(),
  content: Joi.string().allow(null, ""),
  sub: Joi.number(),
  contentType: Joi.string().max(32),
  Explain: Joi.string().max(2048).allow(null, ""),
  outLink: Joi.string().max(2048).allow(null, ""),
  Answer: Joi.array().items(Joi.number().allow(null, "")),
  Choice: Joi.array().items(Joi.string()).allow(null, ""),
  Picture: Joi.array().items(Joi.string().allow(null, "")),
});

exports.Content = Content;
exports.validate = schema.validate;
exports.contentSchema = contentSchema;
exports.contentValidateSchema = schema;
