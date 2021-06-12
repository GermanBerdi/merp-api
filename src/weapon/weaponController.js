const skillTypeModel     = require("../skillType/skillTypeModel");
const skillModel         = require("../skill/skillModel");
const attackTableModel   = require("../attackTable/attackTableModel");
const criticalTableModel = require("../criticalTable/criticalTableModel");
const criticalLevelModel = require("../criticalLevel/criticalLevelModel");
const armorTypeModel     = require("../armorType/armorTypeModel");
const weaponTypeModel    = require("../weaponType/weaponTypeModel");
const weaponModel        = require("./weaponModel");

const ObjectId       = require("mongoose").Types.ObjectId;
const utils           = require("../utils");

const weaponController = 
{
  // create a weapon
  create: async function (request, reply) 
  {
    try {
      const weapon = request.body;
      // check if the weapon alredy exist
      if (await utils.checkExist("name", weapon.name, weaponModel))
      {
        reply.code(400).send("Ya existe un weapon con name " + weapon.name);
        return;
      }
      // check if the skill not exist
      skill = await utils.checkId(weapon.skill, skillModel);
      if (!(skill))
      {
        reply.code(400).send("No existe ningun skill con Id " + weapon.skill);
        return;
      }   
      // check if skillType is not "weapon skill"
      skillType = await utils.checkId(skill.skillType, skillTypeModel);
      if (skillType.name != skillTypeModel.contents.weaponSkill)
      {
        reply.code(400).send("El skill " + skill.name + " no tiene un SkillType " + skillTypeModel.contents.weaponSkill); 
        return;
      }
      // check if the attackTable not exist
      attackTable = await utils.checkId(weapon.attackTable, attackTableModel);
      if (!(attackTable))
      {
        reply.code(400).send("No existe ningun AttackTable con Id " + weapon.attackTable);
        return;
      }
      // check criticals
      if (weapon.criticals)
      {
        for (let i = 0; i < weapon.criticals.length; i++)
        {
          //check if criticals[i].criticalTable not exist
          table = await utils.checkId(weapon.criticals[i].criticalTable, criticalTableModel);
          if (!(table))
          {
            reply.code(400).send("No existe ningun criticaltable con Id " + weapon.criticals[i].criticalTable);
            return;
          } 
          // check if criticals[i].maxId not exist
          if (!(await utils.checkId(weapon.criticals[i].criticalMax, criticalLevelModel)))
          {
            reply.code(400).send("No existe ningun criticalLevel con Id " + weapon.criticals[i].criticalMax);
            return;
          }
        }
      }
      // check armorPiercing
      if (weapon.armorPiercing)
      {
        for (let i = 0; i < weapon.armorPiercing.length; i++)
        {
          //check if armorPiercing[i].armorType not exist
          if (!(await utils.checkId(weapon.armorPiercing[i].armorType, armorTypeModel)))
          {
            reply.code(400).send("No existe ningun armorType con Id " + weapon.armorPiercing[i].armorType);
            return;
          }
        }
      }
      // check if weaponType not exist
      if (!(await utils.checkId(weapon.weaponType, weaponTypeModel)))
      {
        reply.code(400).send("No existe ningun weaponType con Id " + weapon.weaponType);
        return;
      }
      // all checks passed ok
      const newWeapon = await weaponModel.create(weapon);
      reply.code(201).send(newWeapon);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
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
  }
}

module.exports = weaponController;