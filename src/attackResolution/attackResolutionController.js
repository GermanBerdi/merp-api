const armorModel          = require("../armor/armorModel");
const weaponModel         = require("../weapon/weaponModel");
const attackIntervalModel = require("../attackTable/attackIntervalModel");
const characterModel      = require("../character/characterModel");

const ObjectId = require("mongoose").Types.ObjectId;
const utils    = require("../utils");

const attackResolutionController = 
{
  // attack resolution (This is when an attacker use his weapon against a defender)
  attack: async function (request, reply)
  {
    try
    {
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
                        .populate({
                          path: "rightHand",
                          populate:[{
                            path: "skill",
                            select: "-skillType",
                          },{
                            path: "attackTable",
                          },{
                            path: "weaponType",
                          },{
                            path: "criticals",
                            populate:[{
                              path: "criticalTable"
                            },{
                              path: "criticalMax"
                            }]
                          }]
                        });
      if (!(attacker))
      {
        reply.code(400).send(AttackerId + " no es el Id de un character");
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
      const defender = await characterModel.findById(defenderId)
                        .populate({
                          path: "armor",
                          populate:{
                            path: "armorType",
                            select: "-skill -encumbrance",
                            populate:{
                              path: "endurance",
                            }
                          }
                        });
      if (!(defender))
      {
        reply.code(400).send(defenderId + "no es el Id de un character");
        return;
      }    
      // all check passed ok
      const attackRoll = utils.rollDice(100);
      
      // checking weapon´s criticals
      criticals = "";
      for (let i = 0; i < attacker.rightHand.criticals.length; i++)
      {
        // put "," after the first critical
        if (i > 0) criticals += ", ";
        criticals += attacker.rightHand.criticals[i].criticalTable.name;
        criticals += " lvl(";
        criticals += attacker.rightHand.criticals[i].criticalSeverity;
        criticals += ") max(";
        criticals += attacker.rightHand.criticals[i].criticalMax.name;
        criticals += ")";
      }
      // if after check weapon there is no criticals put "none"
      if (criticals == "") criticals = "none";

      // checking weapon´s pircing for defender armorType
      armorPircing = 0;
      for (let i = 0; i < attacker.rightHand.armorPiercing.length; i++)
      {
        // defender.armor.armorType._id;
        if (attacker.rightHand.armorPiercing[i].armorType.equals(defender.armor.armorType._id))
        armorPircing = attacker.rightHand.armorPiercing[i].bonus;
      }
      attackValue = attackRoll + armorPircing;

      // calculate Damage:
      // looking in the Table where the weapon attack...
      // for the endurance fo the defender...
      // how many hit point and if there is a critical
      damage = await utils.findNumAttackTable(attackValue, 
                                              attacker.rightHand.attackTable._id,
                                              defender.armor.armorType.endurance._id,
                                              attackIntervalModel);
      
      if (!(damage))
      {
        reply.code(400).send("Valor fuera de rango");
        return;
      }
      
      if (damage.criticalLevel)
      {
        critical = damage.criticalLevel.name
      }
      else critical = "";
      
      //prepare response
      const attackResoluction =
      {
        "roll"               : attackRoll,
        "weapon"             : attacker.rightHand.name,
        "skill"              : attacker.rightHand.skill.name,
        "table"              : attacker.rightHand.attackTable.name,
        "weaponType"         : attacker.rightHand.weaponType.name,
        "criticals"          : criticals,
        "armorPircing"       : armorPircing,
        "armor"              : defender.armor.name,
        "armorType"          : defender.armor.armorType.name,
        "armorTypeEndurance" : defender.armor.armorType.endurance.name,
        "atackValue"         : attackValue,
        "damage"             : damage.lifePoints,
        "critical"           : critical,
      }

      reply.code(200).send(attackResoluction);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}

module.exports = attackResolutionController;