const armorModel     = require("../armor/armorModel");
const weaponModel    = require("../weapon/weaponModel");
const characterModel = require("../character/characterModel");

const ObjectId       = require("mongoose").Types.ObjectId;
const utils          = require("../utils");

const attackResolutionController = 
{
  // attack resolution (This is when an attacker use his weapon to hit a defender)
  attack: async function (request, reply) 
  {
    try {
      const attackerId = request.params.attacker;
      const defenderId = request.params.defender;
      
      // check if request.params.attacker has a valid length for an Id
      if ((attackerId.length != 12) && (attackerId.length != 24))
      {
        reply.code(400).send("El Id " + attackerId + " no tiene un longitud válida");
        return;
      }
      // check if request.params.attacker is a valid Id
      let validId = new ObjectId(attackerId);
      if (attackerId != validId)
      {
        reply.code(400).send("El Id " + attackerId + " no es válido");
        return;
      }
      // check if attacker not exist
      const attacker = await characterModel.findById(attackerId)
                        .populate([{
                          path: "armor",
                          select: "-_id -__v",
                          populate:{
                            path: "armorType",
                            select: "-_id -__v -name -skill -encumbrance",
                            // no puedo hacer el populate del endurance.
                          }
                        },{
                          path: "rightHand",
                          select: "-_id -__v",
                          populate:[{
                            path: "skill",
                            select: "-_id -__v -skillType",
                          },{
                            path: "attackTable",
                            select: "-_id -__v"
                          },{
                            path: "weaponType",
                            select: "-_id -__v"
                          },{
                            path: "criticals",
                            populate:{
                              path: "criticalTable",
                              select: "-_id -__v"
                            }
                          }]
                        }]);
      if (!(attacker))
      {
        reply.code(400).send(AttackerId + "no es el Id de un character");
        return;
      }
      // check if request.params.defender has a valid length for an Id
      if ((defenderId.length != 12) && (defenderId.length != 24))
      {
        reply.code(400).send("El Id " + defenderId + " no tiene un longitud válida");
        return;
      }
      // check if request.params.defender is a valid Id
      validId = new ObjectId(defenderId);
      if (defenderId != validId)
      {
        reply.code(400).send("El Id " + defenderId + " no es válido");
        return;
      }
      // check if defender not exist
      const defender = await utils.checkId(defenderId, characterModel);
      if (!(defender))
      {
        reply.code(400).send(defenderId + "no es el Id de un character");
        return;
      }
      /*// check if the armor not exist
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
      reply.code(201).send(newCharacter);*/

/*
      attacker.populate({
        path:"armor",
        select: "-_id -__v"
      });*/

      reply.code(200).send(attacker + " vs " + defender);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}

module.exports = attackResolutionController;