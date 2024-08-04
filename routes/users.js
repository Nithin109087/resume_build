const express = require("express");
const router = express.Router();
const data = require("../data");
const validate = require("../helper/validator");
const utils = require("../helper/utils");
const usersData = data.users;
const validator = require("../helper/validator");
const { errorCode } = require("../helper/common");
const { ErrorMessage, SuccessMessage } = require("../helper/message");

router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  if (req.query != null && req.query.error != null) {
    params.error = req.query.error;
  }
  return res.render("login");
});

router.get("/users/previousFiles", (req, res) => {
  if (req.session.user) {
    return res.render("previousFiles");
  }
  if (req.query != null && req.query.error != null) {
    params.error = req.query.error;
  }
  return res.render("login");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await usersData.loginUser(username, password);
    req.session.user = user;
    return res.json(user);
  } catch (e) {
    if (typeof e == "string") {
      e = new Error(e);
      e.code = errorCode.BAD_REQUEST;
    }
    return res
      .status(validator.isValidResponseStatusCode(e.code) ? e.code : 500)
      .json(ErrorMessage(e.message));
  }
});

//delete data
router.delete("/users/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deluser = await data.users.remove(id);
    res.json("The ${id} is deleted");
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

// get user
router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  if (id !== req.session.user._id) {
    return res.redirect(
      "/?error=" + encodeURIComponent("You cannot view another user's profile.")
    );
  }
  try {
    utils.parseObjectId(id, "User ID");
    const thisuser = await usersData.get(id);

    return res.render("userprofile", {
      nameOfUser: thisuser.firstname + " " + thisuser.lastname,
      email: thisuser.email,
      phoneNumber: thisuser.phonenumber,
      userName: thisuser.username,
      linkedin: thisuser.linkedin,
      user: req.session.user,
    });
  } catch (e) {
    return res.status(errorCode.NOT_FOUND).render("error", {
      code: errorCode.NOT_FOUND,
      error: e,
      user: req.session.user,
    });
  }
});

router.get("/users/register", async (req, res) => {
  if (!req.session.user) {
    return res.render("register");
  } else {
    return res.redirect("/");
  }
});

router.post("/users/register", async (req, res) => {
  const userData = req.body;
  try {
    const {
      firstname,
      lastname,
      email,
      linkedin,
      phonenumber,
      username,
      password,
    } = userData;
    const newUser = await usersData.create(
      firstname,
      lastname,
      email,
      linkedin,
      phonenumber,
      username,
      password
    );
    req.session.user = newUser;
    return res.json(newUser);
  } catch (e) {
    return res.status(400).json(ErrorMessage(e));
  }
});

//update
router.get("/users/update", async (req, res) => {
  if (req.session.user) {
    try {
      let userId = req.session.user._id.toString();
      const userInfo = await usersData.get(userId);
      return res.render("updateProfile", {
        nameOfUser: userInfo.firstname + " " + userInfo.lastname,
        email: userInfo.email,
        phonenumber: userInfo.phonenumber,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        linkedin: userInfo.linkedin,
        user: req.session.user,
      });
    } catch (e) {
      if (typeof e == "string") {
        e = new Error(e);
        e.code = 400;
      }
      return res
        .status(validator.isValidResponseStatusCode(e.code) ? e.code : 500)
        .render("error", {
          code: validator.isValidResponseStatusCode(e.code) ? e.code : 500,
          error: e.message,
          user: req.session.user,
        });
    }
  } else {
    return res.redirect("/login");
  }
});

router.post("/users/update", async (req, res) => {
  const userData = req.body;
  const id = req.session.user._id.toString();
  // update validation in routes
  try {
    
  } catch (e) {
    console.log("errror");
    return res.render("updateProfile", {
      user: req.session.user,
      error: e,
    });
  }
  try {
    const firstname = userData.firstname;
    const lastname = userData.lastname;
    const email = userData.email;
    const phonenumber = userData.phonenumber;
    const linkedin = userData.linkedin;
    
    const newUser = await usersData.update(
      id,
      firstname,
      lastname,
      email,
      linkedin,
      phonenumber
    );
    req.session.user = newUser;
    res.redirect("/");
  } catch (e) {
    return res.render("updateProfile", {
      user: req.session.user,
      error: e,
    });
    //res.status(500).json({ error: e });
  }
});

module.exports = router;
