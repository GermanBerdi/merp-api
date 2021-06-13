const enduranceModel = require("../endurance/enduranceModel");
const skillModel     = require("../skill/skillModel");
const skillTypeModel = require("../skillType/skillTypeModel");
const armorTypeModel = require("./armorTypeModel");

const ObjectId       = require("mongoose").Types.ObjectId;
const utils          = require("../utils");

const armorTypeController =
{
  // create an armorType
  create: async function (request, reply)
  {
    try
    {
      const armorType = request.body;
      // check if the armorType alredy exist
      if (await utils.checkExist("name", armorType.name, armorTypeModel)) 
      {
        reply.code(400).send("Ya existe un armorType con name " + armorType.name);
        return;
      }
      // check if the endurance not exist
      const endurance = await utils.checkId(armorType.endurance, enduranceModel);
      if (!(endurance))
      {
        reply.code(400).send("No existe ninguna endurance con Id " + armorType.endurance);
        return;
      }
      // check if the skill not exist
      const skill = await utils.checkId(armorType.skill, skillModel);
      if (!(skill))
      {
        reply.code(400).send("No existe ningun skill con Id " + armorType.skill);
        return;
      }
      // check if skillType is not "movement manouver"
      const skillType = await utils.checkId(skill.skillType, skillTypeModel);
      if (skillType.name != skillTypeModel.contents.movementManouver)
      {
        reply.code(400).send("El skill " + skill.name + " no tiene un skillType " + skillTypeModel.contents.movementManouver);
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
  },
  // get the list of armorTypes
  fetch: async function (request, reply)
  {
    try
    {
      const armorTypes = await armorTypeModel.find({})
                           .populate([{
                             path:"endurance",
                             select: "-_id name"
                           },{
                             path:"skill",
                             select: "-_id name"
                           }]);

      reply.code(200).send(armorTypes);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // delete an armorType
  delete: async function (request, reply)
  {
    try 
    {
      const armorTypeId = request.params.id;
      //check if request.params.id has a valid length for an Id
      if ((armorTypeId.length != 12) && (armorTypeId.length != 24))
      {
        reply.code(400).send("El Id " + armorTypeId + " no tiene un longitud válida");
        return;
      }
      //check if request.params.id is a valid Id
      const validId = new ObjectId(armorTypeId);
      if (armorTypeId != validId)
      {
        reply.code(400).send("El Id " + armorTypeId + " no es válido");
        return;
      }
      const armorTypeToDelete = await utils.checkId(armorTypeId,armorTypeModel);
      //check if armorTypeId not exist
      if (!(armorTypeToDelete))
      {
        reply.code(400).send("No existe ningun armorType con Id " + armorTypeId);
        return;
      }
      // all checks passed ok
      await armorTypeModel.findByIdAndDelete(armorTypeId);
      reply.code(200).send(armorTypeToDelete.name);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}

module.exports = armorTypeController;