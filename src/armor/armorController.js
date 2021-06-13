const armorTypeModel = require("../armorType/armorTypeModel");
const armorModel     = require("./armorModel");

const ObjectId       = require("mongoose").Types.ObjectId;
const utils          = require("../utils");

const armorController =
{
  // create an armor
  create: async function (request, reply)
  {
    try 
    {
      const armor = request.body;
      //check if the armor alredy exist
      if (await utils.checkExist("name", armor.name, armorModel)) 
      {
        reply.code(400).send("Ya existe un armor con name " + armor.name);
        return;
      }   
      // check if the armorType not exist
      const armorType = await utils.checkId(armor.armorType, armorTypeModel);
      if (!(armorType))
      {
        reply.code(400).send("No existe ningun armorType con Id " + armor.armorType);
        return;
      }
      // all checks passed ok
      const newArmor = await armorModel.create(armor);
      reply.code(201).send(newArmor);
    } 
    catch (e)
    {
      reply.code(500).send(e);
    }
  },
  // get the list of armors
  fetch: async function (request, reply)
  {
    try
    {
      const armors = await armorModel.find({})
                       .populate({
                          path: "armorType",
                          select: "-_id -__v",
                          populate: [{
                            path: "endurance",
                            select: "-_id -__v"
                          },{
                            path: "skill",
                            select: "-_id -__v",
                            populate: {
                              path: "skillType",
                              select: "-_id -__v"
                            }
                          }]
                        });

      reply.code(200).send(armors);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // delete an armor
  delete: async function (request, reply)
  {
    try 
    {
      const armorId = request.params.id;
      //check if request.params.id has a valid length for an Id
      if ((armorId.length != 12) && (armorId.length != 24))
      {
        reply.code(400).send("El Id " + armorId + " no tiene un longitud válida");
        return;
      }
      //check if request.params.id is a valid Id
      const validId = new ObjectId(armorId);
      if (armorId != validId)
      {
        reply.code(400).send("El Id " + armorId + " no es válido");
        return;
      }
      const armorToDelete = await utils.checkId(armorId,armorModel);
      //check if armorId not exist
      if (!(armorToDelete))
      {
        reply.code(400).send("No existe ningun armor con Id " + armorId);
        return;
      }
      // all checks passed ok
      await armorModel.findByIdAndDelete(armorId);
      reply.code(200).send(armorToDelete.name);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}

module.exports = armorController; 