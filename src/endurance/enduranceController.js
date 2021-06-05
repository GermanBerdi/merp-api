const enduranceModel = require("./enduranceModel");

const ObjectId       = require("mongoose").Types.ObjectId;
const utils          = require("../utils");

const enduranceController =
{
  // create an endurance
  create: async function(request, reply)
  {
    try
    {
      const endurance = request.body;
      // check if the endurance alredy exist
      if (await utils.checkExist("name", endurance.name, enduranceModel))
      {
        reply.code(201).send("Ya existe un endurance con name " + endurance.name);
        return;
      }
      // all checks passed ok
      const newEndurance = await enduranceModel.create(endurance);
      reply.code(201).send(newEndurance);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // get the list of endurances
  fetch: async function (request, reply)
  {
    try
    {
      const endurances = await enduranceModel.find({});
      reply.code(200).send(endurances);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // delete an endurance
  delete: async function (request, reply)
  {
    try 
    {
      const enduranceId = request.params.id;
      //check if request.params.id has a valid length for an Id
      if ((enduranceId.length != 12) && (enduranceId.length != 24))
      {
        reply.code(201).send("El Id " + enduranceId + " no tiene un longitud válida");
        return;
      }
      //check if request.params.id is a valid Id
      const validId = new ObjectId(enduranceId);
      if (enduranceId != validId)
      {
        reply.code(201).send("El Id " + enduranceId + " no es válido");
        return;
      }
      const enduranceToDelete = await utils.checkId(enduranceId,enduranceModel);
      //check if enduranceId not exist
      if (!(enduranceToDelete))
      {
        reply.code(201).send("No existe ningun endurance con Id " + enduranceId);
        return;
      }
      // all checks passed ok
      await enduranceModel.findByIdAndDelete(enduranceId);
      reply.code(200).send(enduranceToDelete.name);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}

module.exports = enduranceController;