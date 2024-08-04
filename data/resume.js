const mongoCollections = require("../config/mongoCollections");
const usersCol = mongoCollections.users;
const { ObjectId } = require("mongodb");

async function create(
  id,
  linkedin,
  address,

  title,
  profile,
  // education
  education_field,
  education_qualification,
  education_school,
  education_fromYear,
  education_toYear,

  // experiences
  experience_title,
  experience_company,
  experience_fromYear,
  experience_toYear,

  // skills
  skill_name,
  skill_proficiency
) {
  const userColnew = await usersCol();
  const users = await userColnew.findOne({
    _id: ObjectId(id),
  });
  id = id.trim();
  if (!linkedin) throw "Not a valid linkedin url";
  linkedin = linkedin.trim();
  if (!address) throw "Not a valid address";
  address = address.trim();
  if (typeof address !== "string" || address.length === 0)
    throw "Not a valid type of address";
  if (!title) throw "Not a valid title";
  title = title.trim();
  if (typeof title !== "string" || title.length === 0)
    throw "Not a valid type of title";
  if (!profile) throw "Not a valid profile";
  profile = profile.trim();
  if (typeof profile !== "string" || profile.length === 0)
    throw "Not a valid type of profile";
  if (!education_field) throw "Not a valid education field";
  education_field = education_field.trim();
  if (typeof education_field !== "string" || education_field.length === 0)
    throw "Not a valid type of education field";
  if (!education_qualification) throw "Not a valid education qualification";
  education_qualification = education_qualification.trim();
  if (
    typeof education_qualification !== "string" ||
    education_qualification.length === 0
  )
    throw "Not a valid type of education qualification";
  if (!education_school) throw "Not a valid education school";
  education_school = education_school.trim();
  if (typeof education_school !== "string" || education_school.length === 0)
    throw "Not a valid type of education school";
  if (!education_fromYear) throw "Not a valid education from year";
  if (!education_toYear) throw "Not a valid education to year";
  if (!experience_title) throw "Not a valid experience title";
  experience_title = experience_title.trim();
  if (typeof experience_title !== "string" || experience_title.length === 0)
    throw "Not a valid type of experience title";
  if (!experience_company) throw "Not a valid experience company";
  experience_company = experience_company.trim();
  if (typeof experience_company !== "string" || experience_company.length === 0)
    throw "Not a valid type of experience company";
  if (!experience_fromYear) throw "Not a valid experience from year";

  if (!experience_toYear) throw "Not a valid experience to year";

  if (!skill_name) throw "Not a valid skill name";
  skill_name = skill_name.trim();
  if (typeof skill_name !== "string" || skill_name.length === 0)
    throw "Not a valid type of skill name";
  if (!skill_proficiency) throw "Not a valid skill proficiency";
  skill_proficiency = skill_proficiency.trim();
  if (typeof skill_proficiency !== "string" || skill_proficiency.length === 0)
    throw "Not a valid type of skill proficiency";

  const newResume = {
    linkedIn: linkedin,
    address: address,
    title: title,
    profile: profile,
    // education
    education_field: education_field,
    education_qualification: education_qualification,
    education_school: education_school,
    education_fromYear: education_fromYear,
    education_toYear: education_toYear,

    // experiences
    experience_title: experience_title,
    experience_company: experience_company,
    experience_fromYear: experience_fromYear,
    experience_toYear: experience_toYear,

    // skills
    skill_name: skill_name,
    skill_proficiency: skill_proficiency,
  };

  if (users === null) throw `No user exists with such ${id}`;

  const updateUsers = await userColnew.updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $addToSet: {
        resume: newResume,
      },
    }
  );

  if (!updateUsers.matchedCount && !updateUsers.modifiedCount) {
    throw "failed to update resume details";
  }
  return newResume;
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