const tableModel          = require("./tableModel");
const enduranceModel      = require("../endurance/enduranceModel");
const criticalModel       = require("../critical/criticalModel");
const attackIntervalModel = require("./attackIntervalModel");
const utils               = require("../utils");

module.exports = 
{
  //# create an attackInterval
  create: async (request, reply) => {
    try {
      const attackInterval = request.body;   
      // check if the tableId not exist
      table = await utils.checkId(attackInterval.tableId,tableModel);
      if (!(table))
      {
        reply.code(201).send("No existe ninguna Table con Id " + attackInterval.tableId);
        return;
      }   
      // check if tableType is not "attack"
      if (table.tableType != tableModel.tableType.attack)
      {
        reply.code(201).send("La tabla " + table.name + " no tiene un tableType " + tableModel.tableType.attack);
        return
      }
      // check if the enduranceId not exist
      if (!(await utils.checkId(attackInterval.enduranceId,enduranceModel)))
      {
        reply.code(201).send("No existe ningun endurance con Id " + attackInterval.enduranceId);
        return;
      }
      // if criticalId is not undefined, check if the criticalId not exist
      if ((attackInterval.criticalId) && !(await utils.checkId(attackInterval.criticalId,criticalModel)))
      {
        reply.code(201).send("No existe ningun critical con Id " + attackInterval.criticalId);
        return;
      }
      //check the minimun is minor than the maximun
      if (attackInterval.min > attackInterval.max)
      {
        reply.code(201).send("El mínimo del rango no puede ser mayor que el máximo");
        return;
      }
      //check that the minimun interval isn´t included in an existing interval
      minInTable = await utils.findNumAttackTable(attackInterval.min,attackInterval.tableId,attackInterval.enduranceId,attackIntervalModel);
      if (minInTable)
      {
        reply.code(201).send(attackInterval.min + " ya esta incluido en el intervalo " + minInTable);
        return;
      }
      //check that the maximun interval isn´t included in an existing interval
      maxInTable = await utils.findNumAttackTable(attackInterval.max,attackInterval.tableId,attackInterval.enduranceId,attackIntervalModel);
      if (maxInTable)
      {
        reply.code(201).send(attackInterval.max + " ya esta incluido en el intervalo " + maxInTable);
        return;
      }
      //check there is no interval inside the interval
      intervalInside = await utils.findRangeAttackTable(attackInterval.min,attackInterval.max,attackInterval.tableId,attackInterval.enduranceId,attackIntervalModel);
      if (intervalInside)
      {
        reply.code(201).send("Entre " + attackInterval.min + " y " + attackInterval.max + " ya esta incluido en el intervalo " + intervalInside);
        return;
      }
      // all checks passed ok
      const newAttackInterval = await attackIntervalModel.create(attackInterval);
      reply.code(201).send(newAttackInterval);
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