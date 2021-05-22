const skillTypeModel  = require("../skillType/skillTypeModel");
const skillModel      = require("../skill/skillModel");
const tableModel      = require("../table/tableModel");
const criticalModel   = require("../critical/criticalModel");
const armorTypeModel  = require("../armorType/armorTypeModel");
const weaponTypeModel = require("../weaponType/weaponTypeModel");
const weaponModel     = require("./weaponModel");
const utils           = require("../utils");

module.exports = 
{
  //# create an attackInterval
  create: async (request, reply) => {
    try {
      const weapon = request.body;
      // check if the weapon alredy exist
      if (await utils.checkExist("name", weapon.name, weaponModel))
      {
        reply.code(201).send("Ya existe un weapon con name " + weapon.name);
        return;
      }
      // check if the skillId not exist
      skill = await utils.checkId(weapon.skillId, skillModel);
      if (!(skill))
      {
        reply.code(201).send("No existe ningun skill con Id " + weapon.skillId);
        return;
      }   
      // check if skillType is not "weapon skill"
      skillType = await utils.checkId(skill.skillTypeId, skillTypeModel);
      if (skillType.name != skillTypeModel.contents.weaponSkill)
      {
        reply.code(201).send("El skill " + skill.name + " no es un SkillType " + skillTypeModel.contents.weaponSkill); 
        return;
      }
      // check if the TableId not exist
      attackTable = await utils.checkId(weapon.attackTableId, tableModel);
      if (!(attackTable))
      {
        reply.code(201).send("No existe ningun table con Id " + weapon.attackTableId);
        return;
      }
      // check if tableType is not "attack"
      if (attackTable.tableType != tableModel.tableType.attack)
      {
        reply.code(201).send("La tabla " + table.name + " no es un tableType " + tableModel.tableType.attack);
        return
      }
      // check criticals
      for (let i = 0; i < weapon.criticals.length; i++)
      {
        //check if criticals[i].criticalTableId not exist
        table = await utils.checkId(weapon.criticals[i].criticalTableId, tableModel);
        if (!(table))
        {
          reply.code(201).send("No existe ningun table con Id " + weapon.criticals[i].criticalTableId);
          return;
        }
        // check if criticals[i].criticalTableId is not critical
        if (table.tableType != tableModel.tableType.critical)
        {
          reply.code(201).send("La tabla " + table.name + " no es un tableType " + tableModel.tableType.critical);
          return
        } 
        // check if criticals[i].maxId not exist
        if (!(await utils.checkId(weapon.criticals[i].criticalMaxId, criticalModel)))
        {
          reply.code(201).send("No existe ningun critical con Id " + weapon.criticals[i].criticalMaxId);
          return;
        }
      }
      // check armorPiercing
      for (let i = 0; i < weapon.armorPiercing.length; i++)
      {
        //check if armorPiercing[i].armorTypeId not exist
        if (!(await utils.checkId(weapon.armorPiercing[i].armorTypeId, armorTypeModel)))
        {
          reply.code(201).send("No existe ningun armorType con Id " + weapon.armorPiercing[i].armorTypeId);
          return;
        }
      }
      // check if weaponType not exist
      if (!(await utils.checkId(weapon.weaponTypeId, weaponTypeModel)))
      {
        reply.code(201).send("No existe ningun weaponType con Id " + weapon.weaponTypeId);
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
/*
  //#get the list of notes
  fetch: async (request, reply) => {
    try {
      const armours = await armour_model.find({});
      reply.code(200).send(armours);
    } catch (e) {
      reply.code(500).send(e);
    }
  }*/
}

/*
  //#get a single note
  get: async (request, reply) => {
    try {
      const noteId = request.params.id;
      const note = await Note.findById(noteId);
      reply.code(200).send(note);
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#update a note
  update: async (request, reply) => {
    try {
      const noteId = request.params.id;
      const updates = request.body;
      await Note.findByIdAndUpdate(noteId, updates);
      const noteToUpdate = await Note.findById(noteId);
      reply.code(200).send({ data: noteToUpdate });
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#delete a note
  delete: async (request, reply) => {
    try {
      const noteId = request.params.id;
      const noteToDelete = await Note.findById(noteId);
      await Note.findByIdAndDelete(noteId);
      reply.code(200).send({ data: noteToDelete });
    } catch (e) {
      reply.code(500).send(e);
    }
  },
*/