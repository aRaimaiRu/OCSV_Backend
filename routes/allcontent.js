const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { AllContent, validate } = require("../models/allcontent");
const { Main } = require("../models/mainTopic");
const { Sub } = require("../models/subTopic");
const { Content } = require("../models/content");

router.get("/", auth, async (req, res) => {
  let allcontent = await AllContent.find({ AuthorID: req.user._id });
  res.status(200).send(allcontent);
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

module.exports = router;
