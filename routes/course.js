const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Course, validate } = require("../models/course");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  let course = await Course.find({ AuthorID: req.user._id });
  res.status(200).send(course);
});
/*
        1.check auth
        2.get id
        3.find all course by ID
        4.send

*/
router.post("/create", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let course = new Course({
    module: req.body.module,
    grade: req.body.module,
    AuthorID: req.user._id,
  });
  course.save();
  res.status(200).send(course);
});
/*
    1.check auth
    2.get id
    3.create (Course.save())
    4.send
*/

module.exports = router;
