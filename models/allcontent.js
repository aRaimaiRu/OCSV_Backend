const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { mainSchema, mainValidateSchema } = require("./mainTopic");
const { subSchema, subJoiSchema } = require("./subTopic");
const { contentSchema, contentValidateSchema } = require("./content");

const allcontentSchema = new mongoose.Schema({
  module: String,
  grade: String,
  AuthorID: mongoose.Schema.Types.ObjectId,
  mainTopic: [mainSchema],
  subTopic: [subSchema],
  content: [contentSchema],
});

const AllContent = mongoose.model("AllContent", allcontentSchema);

function validateContent(content) {
  const schema = Joi.object({
    module: String,
    grade: String,
    // AuthorID: Joi.objectId(),
    mainTopic: Joi.array().items(mainValidateSchema),
    subTopic: Joi.array().items(subJoiSchema),
    content: Joi.array().items(contentValidateSchema),
  });

  return schema.validate(content);
}

exports.AllContent = AllContent;
exports.validate = validateContent;
