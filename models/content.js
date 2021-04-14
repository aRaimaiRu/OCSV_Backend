const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { mainSchema, mainValidateSchema } = require("./mainTopic");
const { subSchema, subValidateSchema } = require("./subTopic");

// const mainSchema = new mongoose.Schema({
//   courseID: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//     maxlength: 255,
//   },
// });
// const subSchema = new mongoose.Schema({
//   main: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//     maxlength: 255,
//   },
// });

const contentSchema = new mongoose.Schema({
  mainTopic: [mainSchema],
  subTopic: [subSchema],
  content: {
    type: String,
  },
  sub: {
    type: mongoose.Schema.Types.ObjectId,
  },
  contentType: {
    type: String,
    maxlength: 32,
  },
  Explain: {
    type: String,
    minlength: 1,
    maxlength: 2048,
  },
  outLink: {
    type: String,
    minlength: 1,
    maxlength: 2048,
  },
  Answer: [Number],
  Choice: [String],
  Picture: [String],
});

const Content = mongoose.model("Content", contentSchema);

function validateContent(content) {
  //   const myMainSchema = Joi.object({
  //     courseID: Joi.objectId().required(),
  //     title: Joi.string().max(255).required(),
  //   });
  //   const mySubSchema = Joi.object({
  //     main: Joi.objectId().required(),
  //     title: Joi.string().max(255).required(),
  //   });

  const schema = Joi.object({
    mainTopic: Joi.array().items(mainValidateSchema),
    subTopic: Joi.array().items(subValidateSchema),
    content: Joi.string(),
    sub: Joi.objectId(),
    contentType: Joi.string().max(32),
    Explain: Joi.string().max(2048),
    outLink: Joi.string().max(2048),
    Answer: Joi.array().items(Joi.number()),
    Choice: Joi.array().items(Joi.string()),
    Picture: Joi.array().items(Joi.string()),
  });

  return schema.validate(content);
}

exports.Main = Content;
exports.validate = validateContent;
