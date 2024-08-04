const mongoCollections = require("../config/mongoCollections");
const usersCol = mongoCollections.users;
const { ObjectId } = require("mongodb");
const validator = require("../helper/validator");

async function create(
  id,
  linkedin,
  fullname,
  managerName,
  companyAddress,
  companyPhone,
  companyEmail,
  salutation,

  firstParagraph,
  secondParagraph,
  thirdParagraph,
  finalParagraph
) {
  // Input Validation by calling functions from validation.js
  const userColnew = await usersCol();

  const users = await userColnew.findOne({
    _id: ObjectId(id),
  });
  if (!fullname) throw "Not a valid fullname";
  fullname = fullname.trim();
  if (typeof fullname !== "string" || fullname.length === 0)
    throw "Not a valid type of fullname";
  if (!managerName) throw "Not a valid managerName";
  managerName = managerName.trim();
  if (typeof managerName !== "string" || managerName.length === 0)
    throw "Not a valid type of managerName";
  if (!companyAddress) throw "Not a valid companyAddress";
  companyAddress = companyAddress.trim();
  if (typeof companyAddress !== "string" || companyAddress.length === 0)
    throw "Not a valid type of companyAddress";
  if (!companyPhone) throw "Not a valid companyPhone";
  if (!companyEmail) throw "Not a valid companyEmail";
  companyEmail = companyEmail.trim();
  if (typeof companyEmail !== "string" || companyEmail.length === 0)
    throw "Not a valid type of companyEmail";
  if (!salutation) throw "Not a valid salutation";
  salutation = salutation.trim();
  if (typeof salutation !== "string" || salutation.length === 0)
    throw "Not a valid type of salutation";
  if (!firstParagraph) throw "Not a valid firstParagraph";
  firstParagraph = firstParagraph.trim();
  if (typeof firstParagraph !== "string" || firstParagraph.length === 0)
    throw "Not a valid type of firstParagraph";
  if (!secondParagraph) throw "Not a valid secondParagraph";
  secondParagraph = secondParagraph.trim();
  if (typeof secondParagraph !== "string" || secondParagraph.length === 0)
    throw "Not a valid type of secondParagraph";
  if (!thirdParagraph) throw "Not a valid thirdParagraph";
  thirdParagraph = thirdParagraph.trim();
  if (typeof thirdParagraph !== "string" || thirdParagraph.length === 0)
    throw "Not a valid type of thirdParagraph";
  if (!finalParagraph) throw "Not a valid finalParagraph";
  finalParagraph = finalParagraph.trim();
  if (typeof finalParagraph !== "string" || finalParagraph.length === 0)
    throw "Not a valid type of finalParagraph";

  const newCoverletter = {
    linkedin: linkedin,
    fullname: fullname,
    // education
    managerName: managerName,
    companyAddress: companyAddress,
    companyPhone: companyPhone,
    companyEmail: companyEmail,
    salutation: salutation,

    firstParagraph: firstParagraph,
    secondParagraph: secondParagraph,
    thirdParagraph: thirdParagraph,
    finalParagraph: finalParagraph,
  };

  if (users === null) throw `No user exists with such ${id}`;

  const updateUsers = await userColnew.updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $addToSet: {
        coverLetter: newCoverletter,
      },
    }
  );

  if (!updateUsers.matchedCount && !updateUsers.modifiedCount) {
    throw "failed to update Coverletter details";
  }
  return newCoverletter;
}

async function build(id) {
  const userColnew = await usersCol();

  const users = await userColnew.findOne({
    _id: ObjectId(id),
  });
  return users;
}

module.exports = {
  create,
  build,
};