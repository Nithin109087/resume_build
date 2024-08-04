const mongoCollections = require("../config/mongoCollections");
const usersCol = mongoCollections.users;
const { ObjectId } = require("mongodb");
const validator = require("../helper/validator");

async function create(
  id,
  address,
  linkedin,
  title,
  profile,

  research_title,

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

  publications_title,
  conference_title,
  courses_title,
  certificate_title,
  volunteer_title,

  // skills
  skill_proficiency,
  skill_name,
) {
  // Input Validation by calling functions from validation.js
  const userColnew = await usersCol();
  const users = await userColnew.findOne({
    _id: ObjectId(id)
  });
  if(!address) throw "Not a valid address";
  address=address.trim();
  if(typeof address !== "string" || address.length === 0) throw "Not a valid type of address";
  if(!title) throw "Not a valid title";
  title=title.trim();
  if(typeof title !== "string" || title.length === 0) throw "Not a valid type of title";
  if(!profile) throw "Not a valid profile";
  profile=profile.trim();
  if(typeof profile !== "string" || profile.length === 0) throw "Not a valid type of profile";
  if(!research_title) throw "Not a valid research title";
  research_title=research_title.trim();
  if(typeof research_title !== "string" || research_title.length === 0) throw "Not a valid type of research title";
  if(!education_field) throw "Not a valid education field";
  education_field=education_field.trim();
  if(typeof education_field !== "string" || education_field.length === 0) throw "Not a valid type of education field";
  if(!education_qualification) throw "Not a valid education qualification";
  education_qualification=education_qualification.trim();
  if(typeof education_qualification !== "string" || education_qualification.length === 0) throw "Not a valid type of education qualification";
  if(!education_school) throw "Not a valid education school";
  education_school=education_school.trim();
  if(typeof education_school !== "string" || education_school.length === 0) throw "Not a valid type of education school";
  if(!education_fromYear) throw "Not a valid education from year";
  
  if(!education_toYear) throw "Not a valid education to year";
  
  if(!experience_title) throw "Not a valid experience title";
  experience_title=experience_title.trim();
  if(typeof experience_title !== "string" || experience_title.length === 0) throw "Not a valid type of experience title";
  if(!experience_company) throw "Not a valid experience company";
  experience_company=experience_company.trim();
  if(typeof experience_company !== "string" || experience_company.length === 0) throw "Not a valid type of experience company";
  if(!experience_fromYear) throw "Not a valid experience from year";
  if(!experience_toYear) throw "Not a valid experience to year";

  if(!publications_title) throw "Not a valid publications title";
  publications_title=publications_title.trim();
  if(typeof publications_title !== "string" || publications_title.length === 0) throw "Not a valid type of publications title";
  if(!conference_title) throw "Not a valid conference title";
  conference_title=conference_title.trim();
  if(typeof conference_title !== "string" || conference_title.length === 0) throw "Not a valid type of conference title";
  if(!courses_title) throw "Not a valid courses title";
  courses_title=courses_title.trim();
  if(typeof courses_title !== "string" || courses_title.length === 0) throw "Not a valid type of courses title";
  if(!certificate_title) throw "Not a valid certificate title";
  certificate_title=certificate_title.trim();
  if(typeof certificate_title !== "string" || certificate_title.length === 0) throw "Not a valid type of certificate title";
  if(!volunteer_title) throw "Not a valid volunteer title";
  volunteer_title=volunteer_title.trim();
  if(typeof volunteer_title !== "string" || volunteer_title.length === 0) throw "Not a valid type of volunteer title";
  if(!skill_proficiency) throw "Not a valid skill proficiency";
  skill_proficiency=skill_proficiency.trim();
  if(typeof skill_proficiency !== "string" || skill_proficiency.length === 0) throw "Not a valid type of skill proficiency";
  if(!skill_name) throw "Not a valid skill name";
  skill_name=skill_name.trim();
  if(typeof skill_name !== "string" || skill_name.length === 0) throw "Not a valid type of skill name";
  
  const newCv = {
    address: address,
    linkedin: linkedin,

    title: title,
    profile: profile,

    research_title: research_title,
   
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

    publications_title: publications_title,
    conference_title: conference_title,
    courses_title: courses_title,
    certificate_title: certificate_title,
    volunteer_title: volunteer_title,
    // skills
    skill_name: skill_name,
    skill_proficiency: skill_proficiency,
  };

  if (users === null)
    throw `No user exists with such ${id}`

  const updateUsers = await userColnew.updateOne({
    _id: ObjectId(id)
  }, {
    $addToSet: {
      cv: newCv
    }
  });

  if (!updateUsers.matchedCount && !updateUsers.modifiedCount) {
    throw "failed to update cv details"
  }
  return newCv;

}

async function build(id) {
  // Input Validation by calling functions from validation.js
  const userColnew = await usersCol();
  const users = await userColnew.findOne({
    _id: ObjectId(id)
  });
  return users;
}

module.exports = {
  create,
  build,
};