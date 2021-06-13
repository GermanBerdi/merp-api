const criticalLevelModel = require("./criticalLevelModel");

const ObjectId           = require("mongoose").Types.ObjectId;
const utils              = require("../utils");

const criticalLevel =
{
  // create a critical
  create: async function (request, reply)
  {
    try
    {
      const criticalLevel = request.body;
      // check if the critical alredy exist
      if (await utils.checkExist("name", criticalLevel.name, criticalLevelModel))
      {
        reply.code(400).send("Ya existe un criticalLevel con name " + criticalLevel.name);
        return;
      }
      const newCriticalLevel = await criticalLevelModel.create(criticalLevel);
      reply.code(201).send(newCriticalLevel);
    } 
    catch (e)
    {
      reply.code(500).send(e);
    }
  },
  // get the list of criticalLevels
  fetch: async function (request, reply)
  {
    try
    {
      const criticalLevels = await criticalLevelModel.find({});
      reply.code(200).send(criticalLevels);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // delete a criticalLevel
  delete: async function (request, reply)
  {
    try 
    {
      const criticalLevelId = request.params.id;
      //check if request.params.id has a valid length for an Id
      if ((criticalLevelId.length != 12) && (criticalLevelId.length != 24))
      {
        reply.code(400).send("El Id " + criticalLevelId + " no tiene un longitud válida");
        return;
      }
      //check if request.params.id is a valid Id
      const validId = new ObjectId(criticalLevelId);
      if (criticalLevelId != validId)
      {
        reply.code(400).send("El Id " + criticalLevelId + " no es válido");
        return;
      }
      const criticalLevelToDelete = await utils.checkId(criticalLevelId,criticalLevelModel);
      //check if criticalLevelId not exist
      if (!(criticalLevelToDelete))
      {
        reply.code(400).send("No existe ningun criticalLevel con Id " + criticalLevelId);
        return;
      }
      // all checks passed ok
      await criticalLevelModel.findByIdAndDelete(criticalLevelId);
      reply.code(200).send(criticalLevelToDelete.name);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}

module.exports = criticalLevel;