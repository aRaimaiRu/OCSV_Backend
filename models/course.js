const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  module: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    unique: true,
  },
  grade: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  AuthorID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

function validateCourse(course) {
  const schema = Joi.object({
    module: Joi.string().min(1).max(255).required(),
    grade: Joi.string().min(1).max(255).required(),
    // AuthorID: Joi.objectId().required(),
  });

  return schema.validate(course);
}

exports.Course = Course;
exports.validate = validateCourse;
