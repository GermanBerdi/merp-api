const skillTypeModel = require("./skillTypeModel");
const ObjectId       = require("mongoose").Types.ObjectId;
const utils          = require("../utils");

const skillTypeController = 
{
  // create a skillType
  create : async function (request, reply)
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
  fetch: async function (request, reply)
  {
    try 
    {
      const skillTypes = await skillTypeModel.find({});
      reply.code(200).send(skillTypes);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // delete a skillType
  delete: async function (request, reply)
  {
    try 
    {
      const skillTypeId = request.params.id;
      //check if request.params.id has a valid length for an Id
      if ((skillTypeId.length != 12) && (skillTypeId.length != 24))
      {
        reply.code(201).send("El Id " + skillTypeId + " no tiene un longitud válida");
        return;
      }
      //check if request.params.id is a valid Id
      const validId = new ObjectId(skillTypeId);
      if (skillTypeId != validId)
      {
        
        reply.code(201).send("El Id " + skillTypeId + " no es válido");
        return;
      }
      const skillTypeToDelete = await utils.checkId(skillTypeId,skillTypeModel);
      //check if skillTypeId not exist
      if (!(skillTypeToDelete))
      {
        reply.code(201).send("No existe ningun skillType con Id " + skillTypeId);
        return;
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

module.exports = skillTypeController;