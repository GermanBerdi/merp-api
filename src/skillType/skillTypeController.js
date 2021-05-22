const skillTypeModel = require("./skillTypeModel");
const ObjectId       = require("mongoose").Types.ObjectId;
const utils          = require("../utils");

module.exports = 
{
  // create a skillType
  create: async (request, reply) => 
  {
    try 
    {
      const skillType = request.body;
      // check if the skillType alredy exist
      if (await utils.checkExist("name" ,skillType.name, skillTypeModel)) 
      {
        reply.code(201).send("Ya existe un skillType con name " + skillType.name);
        return;
      }
      // all checks passed ok
      const newSkillType = await skillTypeModel.create(skillType);
      reply.code(201).send(newSkillType);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // get the list of skillTypes
  fetch: async (request, reply) =>
  {
    try {
      const skillTypes = await skillTypeModel.find({});
      reply.code(200).send(skillTypes);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // delete a skillType
  delete: async (request, reply) =>
  {
    try 
    {
      const skillTypeId = request.params.id;
      //check if request.params.id if a valid Id
      const validId = new ObjectId(skillTypeId);
      if (!(skillTypeId == validId))
      {
        reply.code(201).send("El Id " + skillTypeId + " no es válido");
      }
      const skillTypeToDelete = await utils.checkId(skillTypeId,skillTypeModel);
      //check if skillTypeId not exist
      if (!(skillTypeToDelete))
      {
        reply.code(201).send("No existe ningun skillType con Id " + skillTypeId);  
      }
      // all checks passed ok
      await skillTypeModel.findByIdAndDelete(skillTypeId);
      reply.code(200).send(skillTypeToDelete.name);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}