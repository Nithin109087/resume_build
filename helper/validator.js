const moment = require("moment");
const { ObjectId } = require("mongodb");

module.exports = {
  checkNonNull(varName) {
    if (!varName) {
      throw new Error("Please enter a value for " + varName);
    }
  },
  checkString(varName) {
    if (typeof varName !== "string" || varName.trim().length === 0) {
      throw new Error("Please enter a valid string for " + varName);
    }
  },
  checkIsArray(varName) {
    if (!Array.isArray(varName)) {
      throw new Error("Please enter in an array format for " + varName);
    }
  },
  checkPhoneNumber(phone) {
    if (phone === null) throw `Must pass phone number`;
    const regEx = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/g;
    const regExSimple = /^[0-9]{10}$/g;
    if (!phone.match(regEx) && !phone.match(regExSimple))
      throw `Invalid phone number`;
  },
  checkEmail(email) {
    if (email === null) throw `Must pass email address`;
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/g;
    if (!email.match(regex)) throw `Invalid email address`;
  },

  checkNumber(num, varName) {
    if (varName === null) varName = "Parameter";
    if (num === null) throw `Must pass ${varName}`;
    num = parseFloat(num);
    if (isNaN(num)) throw `${varName} must be a number`;
  },

  checkPassword(str) {
    this.checkString(str, "Password");
    const regEx =
      /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$/g;
    if (!str.match(regEx))
      throw `Password must contain at least one upper, one lower, one special character and one number`;
  },

  isValidObject(obj) {
    return typeof obj == "object" && !Array.isArray(obj);
  },

  isEmptyObject(obj) {
    if (this.isValidObject(obj)) {
      return Object.keys(obj).length === 0;
    }
    return true;
  },

  isValidObjectID(id) {
    if (!ObjectId.isValid(id)) {
      throw `Invalid id: ${id}`;
    }
    return ObjectId(id);
  },

  isValidResponseStatusCode(code) {
    if (code === null || isNaN(code)) return false;
    code = Number(code);
    return code >= 100 && code < 600;
  },
};