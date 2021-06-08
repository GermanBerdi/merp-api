const skillTypeModel     = require("../skillType/skillTypeModel");
const skillModel         = require("../skill/skillModel");
const attackTableModel   = require("../attackTable/attackTableModel");
const criticalTableModel = require("../criticalTable/criticalTableModel");
const criticalLevelModel = require("../criticalLevel/criticalLevelModel");
const armorTypeModel     = require("../armorType/armorTypeModel");
const weaponTypeModel    = require("../weaponType/weaponTypeModel");
const weaponModel        = require("./weaponModel");


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
  }
}

module.exports = weaponController;