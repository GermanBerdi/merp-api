const tableModel            = require("./tableModel");
const criticalIntervalModel = require("./criticalIntervalModel");
const utils                 = require("../utils");

module.exports = 
{
  //# create an attackInterval
  create: async (request, reply) => {
    try {
      const criticalInterval = request.body;   
      // check if the tableId not exist
      table = await utils.checkId(criticalInterval.tableId,tableModel);
      if (!(table))
      {
        reply.code(201).send("No existe ninguna Table con Id " + criticalInterval.tableId);
        return;
      }   
      // check if tableType is not "critical"
      if (table.tableType != tableModel.tableType.critical)
      {
        reply.code(201).send("La tabla " + table.name + " no tiene un tableType " + tableModel.tableType.critical);
        return
      }
      //check the minimun is minor than the maximun
      if (criticalInterval.min > criticalInterval.max)
      {
        reply.code(201).send("El mínimo del rango no puede ser mayor que el máximo");
        return;
      }
      //check that the minimun interval isn´t included in an existing interval
      minInTable = await utils.findNumCriticalTable(criticalInterval.min,criticalInterval.tableId,criticalIntervalModel);
      if (minInTable)
      {
        reply.code(201).send(criticalInterval.min + " ya esta incluido en el intervalo " + minInTable);
        return;
      }
      //check that the maximun interval isn´t included in an existing interval
      maxInTable = await utils.findNumCriticalTable(criticalInterval.max,criticalInterval.tableId,criticalIntervalModel);
      if (maxInTable)
      {
        reply.code(201).send(criticalInterval.max + " ya esta incluido en el intervalo " + maxInTable);
        return;
      }
      //check there is no interval inside the interval
      intervalInside = await utils.findRangeCriticalTable(criticalInterval.min,criticalInterval.max,criticalInterval.tableId,criticalIntervalModel);
      if (intervalInside)
      {
        reply.code(201).send("Entre " + criticalInterval.min + " y " + criticalInterval.max + " ya esta incluido en el intervalo " + intervalInside);
        return;
      }
      // all checks passed ok
      const newCriticalInterval = await criticalIntervalModel.create(criticalInterval);
      reply.code(201).send(newCriticalInterval);
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