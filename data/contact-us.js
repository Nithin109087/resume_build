const mongoCollections = require("../config/mongoCollections");
const contactusCollections = mongoCollections.contactus;
const userCollections = mongoCollections.users;
const validator = require("../helper/validator");
const utils = require("../helper/utils");
const errorCode = require("../helper/common").errorCode;
const userData = require("../data/users");

async function create(id, name, email, subject, message) {
  const users = await userColnew.findOne({
    _id: ObjectId(id)
  });
  const contactusData = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };

  if (users === null)
    throw `No user exists with such ${id}`
    
  const updateUsers = await userColnew.updateOne({
    _id: ObjectId(id)
  }, {
    $addToSet: {
      contactusData: contactusData
    }
  });

  if (!updateUsers.matchedCount && !updateUsers.modifiedCount) {
    throw "failed to update Coverletter details"
  }
}

module.exports = {
  create,
};
