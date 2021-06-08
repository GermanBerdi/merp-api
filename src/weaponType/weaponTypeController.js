const weaponTypeModel = require("./weaponTypeModel");

const ObjectId       = require("mongoose").Types.ObjectId;
const utils          = require("../utils");

const weaponTypeController =
{
  // create a weaponType
  create: async function (request, reply)
  {
    try 
    {
      const weaponType = request.body;
      // check if the weaponType alredy exist
      if (await utils.checkExist("name", weaponType.name, weaponTypeModel)) 
      {
        reply.code(400).send("Ya existe un weaponType con name " + weaponType.name);
        return;
      }
      // all checks passed ok   
      const newWeaponType = await weaponTypeModel.create(weaponType);
      reply.code(400).send(newWeaponType);
    } 
    catch (e)
    {
      reply.code(500).send(e);
    }
  },
  // get the list of weaponTypes
  fetch: async function (request, reply)
  {
    try
    {
      const weaponTypes = await weaponTypeModel.find({});
      reply.code(200).send(weaponTypes);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // delete a weaponType
  delete: async function (request, reply)
  {
    try 
    {
      const weaponTypeId = request.params.id;
      //check if request.params.id has a valid length for an Id
      if ((weaponTypeId.length != 12) && (weaponTypeId.length != 24))
      {
        reply.code(400).send("El Id " + weaponTypeId + " no tiene un longitud válida");
        return;
      }
      //check if request.params.id is a valid Id
      const validId = new ObjectId(weaponTypeId);
      if (weaponTypeId != validId)
      {
        reply.code(400).send("El Id " + weaponTypeId + " no es válido");
        return;
      }
      const weaponTypeToDelete = await utils.checkId(weaponTypeId,weaponTypeModel);
      //check if enduranceId not exist
      if (!(weaponTypeToDelete))
      {
        reply.code(400).send("No existe ningun weaponType con Id " + weaponTypeId);
        return;
      }
      // all checks passed ok
      await weaponTypeModel.findByIdAndDelete(weaponTypeId);
      reply.code(200).send(weaponTypeToDelete.name);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}

module.exports = weaponTypeController;
