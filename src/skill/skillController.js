const skillTypeModel = require("../skillType/skillTypeModel");
const skillModel     = require("./skillModel");
const utils          = require("../utils");

module.exports = 
{
  //# create a skill
  create: async (request, reply) =>
 {
    try {
      const skill = request.body;
      // check if the skill alredy exist
      if (await utils.checkExist("name", skill.name, skillModel))
      {
        reply.code(201).send("Ya existe un skill con name " + skill.name);
        return;
      }
      // check if the skillTypeId not exist
      if (!(await utils.checkId(skill.skillTypeId,skillTypeModel)))
      {
        reply.code(201).send("No existe ningun skillType con Id " + skill.skillTypeId);  
        return;
      }
      // all checks passed ok
      const newSkill = await skillModel.create(skill);
      reply.code(201).send(newSkill);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}