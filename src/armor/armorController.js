const armorTypeModel = require("../armorType/armorTypeModel");
const armorModel     = require("./armorModel");
const utils          = require("../utils");

module.exports = 
{
  //# create a armor
  create: async (request, reply) => 
  {
    try 
    {
      const armor = request.body;
      //check if the armor alredy exist
      if (await utils.checkExist("name", armor.name, armorModel)) 
      {
        reply.code(201).send("Ya existe un armor con name " + armor.name);
        return;
      }   
      // check if the armorTypeId not exist
      if (!(await utils.checkId(armor.armorTypeId, armorTypeModel)))
      {
        reply.code(201).send("No existe ningun armorType con Id " + armor.armorTypeId);        
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