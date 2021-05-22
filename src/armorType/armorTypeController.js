const enduranceModel = require("../endurance/enduranceModel");
const skillModel     = require("../skill/skillModel");
const skillTypeModel = require("../skillType/skillTypeModel");
const armorTypeModel = require("./armorTypeModel");
const utils          = require("../utils");

module.exports = 
{
  //# create an armorType
  create: async (request, reply) =>
  {
    try
    {
      const armorType = request.body;
      // check if the armorType alredy exist
      if (await utils.checkExist("name", armorType.name, armorTypeModel)) 
      {
        reply.code(201).send("Ya existe un armorType con name " + armorType.name);
        return;
      }
      // check if the enduranceId not exist
      if (!(await utils.checkId(armorType.enduranceId, enduranceModel)))
      {
        reply.code(201).send("No existe ninguna endurance con Id " + armorType.enduranceId);
        return;
      }
      // check if the skillId not exist
      skill = await utils.checkId(armorType.skillId, skillModel);
      if (!(skill))
      {
        reply.code(201).send("No existe ningun skill con Id " + armorType.skillId);  
        return;
      }
      // check if skillType is not "movement manouver"
      skillType = await utils.checkId(skill.skillTypeId, skillTypeModel);
      if (skillType.name != skillTypeModel.contents.movementManouver)
      {
        reply.code(201).send("El skill " + skill.name + " no es un skillType " + skillTypeModel.contents.movementManouver);
        return
      }
      // all checks passed ok
      const newArmorType = await armorTypeModel.create(armorType);
      reply.code(201).send(newArmorType);
    } 
    catch (e)
    {
      reply.code(500).send(e);
    }
  }
};

/*
  //#get a single note
  get: async (request, reply) => {
    try {
      const noteId = request.params.id;
      const note = await Note.findById(noteId);
      reply.code(200).send(note);
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#update a note
  update: async (request, reply) => {
    try {
      const noteId = request.params.id;
      const updates = request.body;
      await Note.findByIdAndUpdate(noteId, updates);
      const noteToUpdate = await Note.findById(noteId);
      reply.code(200).send({ data: noteToUpdate });
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  
*/