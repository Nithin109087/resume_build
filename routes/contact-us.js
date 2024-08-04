const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const resumeData = require("../data/resume");
const utils = require("../helper/utils");
const validator = require("../helper/validator");
const errorCode = require("../helper/common").errorCode;
const ErrorMessage = require("../helper/message").ErrorMessage;
const moment = require("moment");
let nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  return res.render("contact-us", {
    user: req.session.user,
  });
});

router.post("/", async (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/login");
  }
  const { name, email, subject, message } = req.body;

  try {
    //create and store the new user
    const resume = await resumeData.create(user._id, name, email, subject, message);

    res.redirect("/");
  } catch (e) {
    if (typeof e == "string") {
      e = new Error(e);
      e.code = 400;
    }
    return res
      .status(validator.isValidResponseStatusCode(e.code) ? e.code : 500)
      .json(ErrorMessage(e.message));
  }
});

module.exports = router;
