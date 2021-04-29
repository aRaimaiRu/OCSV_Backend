const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { AllContent, validate } = require("../models/allcontent");
const { Main } = require("../models/mainTopic");
const { Sub } = require("../models/subTopic");
const { Content } = require("../models/content");
const { validate_id } = require("../models/validate_id");

router.get("/", auth, async (req, res) => {
  let allcontent = await AllContent.find({ AuthorID: req.user._id });
  res.status(200).json(allcontent);
});

//can use if only if frontend create mainTopicID subTopicID ContentID
/*
 1.map All value in mainTopic generateID insert To new Main                            
 2.filter old id value of mainID  of subTopic then change to new generated mainID  
 3.



*/
/*
  mainTopic.map(c=>{
    let mainGenerateID
    sub.filter(d=>d.main===mainGenerateID).map(e => req.body.subTopic.main == mainGenerateID)
    return new Main({...c,_id:mainGenerateID})
  })


*/
router.post("/create", auth, async (req, res) => {
  try {
    req.body.mainTopic
      ? req.body.mainTopic.map((c) => new Main(c))
      : req.body.mainTopic;
    req.body.subTopic
      ? req.body.subTopic.map((c) => new Sub(c))
      : req.body.subTopic;
    req.body.content
      ? req.body.content.map((c) => new Content(c))
      : req.body.content;

    console.log("req = ", req.body);
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  } catch (e) {
    console.log("My error", e);
  }
  const { module, grade, mainTopic, subTopic, content } = req.body;

  let allcontent = new AllContent({
    module,
    grade,
    AuthorID: req.user._id,
    mainTopic,
    subTopic,
    content,
  });
  allcontent.save();
  res.status(200).send(allcontent);
});

router.put("/edit", auth, async (req, res) => {
  console.log("edit = ", req.body.content[3]);
  try {
    req.body.mainTopic
      ? req.body.mainTopic.map((c) => new Main(c))
      : req.body.mainTopic;
    req.body.subTopic
      ? req.body.subTopic.map((c) => new Sub(c))
      : req.body.subTopic;
    req.body.content
      ? req.body.content.map((c) => new Content(c))
      : req.body.content;

    let { _id, ...bodyNoID } = req.body;
    const { id_error } = validate_id({ _id });
    if (id_error) return res.status(400).send(error.details[0].message);
    const { error } = validate(bodyNoID);
    if (error)
      return res.status(400).send("validate", error.details[0].message);

    // const { _id, module, grade, mainTopic, subTopic, content } = req.body;
    // let myAllContent = await AllContent.findById(_id);
    // myAllContent.modlue = module;
    // myAllContent.grade = grade;
    // ///maintopic
    // myAllContent.mainTopic.title = mainTopic.title;
    // myAllContent.mainTopic.id = mainTopic.id;
    // ////////subtopic
    // myAllContent.subTopic.title = subTopic.title;
    // myAllContent.subTopic.id = subTopic.id;
    // myAllContent.subTopic.main = subTopic.main;
    // ///content
    // myAllContent.content.content = content.content;
    // myAllContent.content.id = content.id;
    // myAllContent.content.sub = content.sub;
    // myAllContent.content.contentType = content.contentType;
    // myAllContent.content.Explain = content.Explain;
    // myAllContent.content.outLink = content.outLink;
    // myAllContent.content.Answer = content.Answer;
    // myAllContent.content.Choice = content.Choice;
    // myAllContent.content.Picture = content.Picture;

    // myAllContent.save();
    // res.status(200).send(myAllContent);
    let myAllContent = await AllContent.replaceOne(
      { _id },
      { ...req.body, AuthorID: req.user._id }
    );
    res.status(200).json({ ...req.body, AuthorID: req.user._id });
  } catch (e) {
    console.log("My error", e);
  }
});

router.delete("/delete", auth, async (req, res) => {
  const { _id, ...bodyNoID } = req.body;
  const { id_error } = validate_id({ _id });
  if (id_error) return res.status(400).send(error.details[0].message);
  let myAllContent = await AllContent.findByIdAndRemove(_id, {
    useFindAndModify: false,
  });
  res.status(200).json(myAllContent);
});

module.exports = router;
