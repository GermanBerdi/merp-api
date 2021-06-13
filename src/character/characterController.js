const armorModel     = require("../armor/armorModel");
const weaponModel    = require("../weapon/weaponModel");
const characterModel = require("./characterModel");

const ObjectId       = require("mongoose").Types.ObjectId;
const utils          = require("../utils");

const characterController = 
{
  // create a character
  create: async function (request, reply) 
  {
    try {
      const character = request.body;
      // check if the character alredy exist
      if (await utils.checkExist("name", character.name, characterModel))
      {
        reply.code(400).send("Ya existe un character con name " + character.name);
        return;
      }
      // check if the armor not exist
      armor = await utils.checkId(character.armor, armorModel);
      if (!(armor))
      {
        reply.code(400).send("No existe ningun armor con Id " + character.armor);
        return;
      }
      // check if there is a weapon in the rightHand
      rightHand = await utils.checkId(character.rightHand, weaponModel)
      if (!(rightHand))
      {
        reply.code(400).send("El objeto equipado en rightHand " + character.rightHand + " no es un weapon");
        return;
      }
      // all checks passed ok
      const newCharacter = await characterModel.create(character);
      reply.code(201).send(newCharacter);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }/*,
  // get the list of weapons
  fetch: async function (request, reply)
  {
    try
    {
      const weapons = await weaponModel.find({})
                        .populate([{
                          path: "skill",
                          select: "-_id -__v",
                          populate:{
                            path: "skillType",
                            select: "-_id -__v"
                          }
                        },{
                          path: "attackTable",
                          select: "-_id -__v"
                        },{
                          path: "weaponType",
                          select: "-_id -__v"
                        },{
                          path: "criticals",
                          populate:[{
                            path: "criticalTable",
                            select: "-_id -__v"
                          },{
                            path: "criticalMax",
                            select: "-_id -__v"
                          }]
                        },{
                          path: "armorPiercing",
                            populate:{
                            path: "armorType",
                            select: "-_id -__v -skill -endurance -encumbrance"
                          }
                        }]);

      reply.code(200).send(weapons);
    }
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // delete a weapon
  delete: async function (request, reply)
  {
    try 
    {
      const weaponId = request.params.id;
      //check if request.params.id has a valid length for an Id
      if ((weaponId.length != 12) && (weaponId.length != 24))
      {
        reply.code(400).send("El Id " + weaponId + " no tiene un longitud válida");
        return;
      }
      //check if request.params.id is a valid Id
      const validId = new ObjectId(weaponId);
      if (weaponId != validId)
      {
        reply.code(400).send("El Id " + weaponId + " no es válido");
        return;
      }
      const weaponToDelete = await utils.checkId(weaponId,weaponModel);
      //check if weaponId not exist
      if (!(weaponToDelete))
      {
        reply.code(400).send("No existe ningun weapon con Id " + weaponId);
        return;
      }
      // all checks passed ok
      await weaponModel.findByIdAndDelete(weaponId);
      reply.code(200).send(weaponToDelete.name);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }*/
}

module.exports = characterController;