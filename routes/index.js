const users = require("./users");
const resume = require("./resumes");
const contactUs = require("./contact-us");
const coverletter = require("./coverletter");
const cv = require("./cv");
const { ErrorMessage } = require("../helper/message");
const validator = require("../helper/validator");
module.exports = async (app) => {
  app.use("/", users);
  app.use("/resume", resume);
  app.use("/coverletter", coverletter);
  app.use("/cv", cv);
  app.use("/contact-us", contactUs);
  app.get("/", async (req, res) => {
    try {
      return res.render("home", {
        user: req.session.user,
      });
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

  app.use("/*", (req, res) => {
    res.status(404).json({
      status: "Error",
      message: "Not found",
    });
  });
};
