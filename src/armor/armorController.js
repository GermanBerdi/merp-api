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
      if (!(await utils.checkId(armor.armorType, armorTypeModel)))
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
  }
}

module.exports = armorController; 