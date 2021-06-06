const skillTypeModel = require("../skillType/skillTypeModel");
const skillModel     = require("./skillModel");

const ObjectId       = require("mongoose").Types.ObjectId;
const utils          = require("../utils");

const skillController =
{
  // create a skill
  create: async function (request, reply)
  {
    try
    {
      const skill = request.body;
      // check if the skill alredy exist
      if (await utils.checkExist("name", skill.name, skillModel))
      {
        reply.code(400).send("Ya existe un skill con name " + skill.name);
        return;
      }
      // check if the skillType not exist
      if (!(await utils.checkId(skill.skillType,skillTypeModel)))
      {
        reply.code(400).send("No existe ningun skillType con Id " + skill.skillType);  
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
  },
  // get the list of skills
  fetch: async function (request, reply)
  {
    try
    {
      const skills = await skillModel.find({})
                      .populate("skillType","-_id name");

      reply.code(200).send(skills);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // delete a skill
  delete: async function (request, reply)
  {
    try 
    {
      const skillId = request.params.id;
      //check if request.params.id has a valid length for an Id
      if ((skillId.length != 12) && (skillId.length != 24))
      {
        reply.code(400).send("El Id " + skillId + " no tiene un longitud válida");
        return;
      }
      //check if request.params.id is a valid Id
      const validId = new ObjectId(skillId);
      if (skillId != validId)
      {
        reply.code(400).send("El Id " + skillTId + " no es válido");
        return;
      }
      const skillToDelete = await utils.checkId(skillId,skillModel);
      //check if skillTypeId not exist
      if (!(skillToDelete))
      {
        reply.code(400).send("No existe ningun skill con Id " + skillId);
        return;
      }
      // all checks passed ok
      await skillModel.findByIdAndDelete(skillId);
      reply.code(200).send(skillToDelete.name);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}

module.exports = skillController;