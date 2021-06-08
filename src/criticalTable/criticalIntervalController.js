const criticalTableModel    = require("./criticalTableModel");
const criticalIntervalModel = require("./criticalIntervalModel");

const ObjectId              = require("mongoose").Types.ObjectId;
const utils                 = require("../utils");

const criticalIntervalController =  
{
  // create a criticalInterval
  create: async function (request, reply)
  {
    try {
      const criticalInterval = request.body;   
      // check if the table not exist
      table = await utils.checkId(criticalInterval.table,criticalTableModel);
      if (!(table))
      {
        reply.code(400).send("No existe ninguna Table con Id " + criticalInterval.table);
        return;
      }
      //check the minimun is minor than the maximun
      if (criticalInterval.min > criticalInterval.max)
      {
        reply.code(400).send("El mínimo del rango no puede ser mayor que el máximo");
        return;
      }
      //check that the minimun interval isn´t included in an existing interval
      minInTable = await utils.findNumCriticalTable(criticalInterval.min,criticalInterval.table,criticalIntervalModel);
      if (minInTable)
      {
        reply.code(400).send(criticalInterval.min + " ya esta incluido en el intervalo " + minInTable);
        return;
      }
      //check that the maximun interval isn´t included in an existing interval
      maxInTable = await utils.findNumCriticalTable(criticalInterval.max,criticalInterval.table,criticalIntervalModel);
      if (maxInTable)
      {
        reply.code(400).send(criticalInterval.max + " ya esta incluido en el intervalo " + maxInTable);
        return;
      }
      //check there is no interval inside the interval
      intervalInside = await utils.findRangeCriticalTable(criticalInterval.min,criticalInterval.max,criticalInterval.table,criticalIntervalModel);
      if (intervalInside)
      {
        reply.code(400).send("Entre " + criticalInterval.min + " y " + criticalInterval.max + " ya esta incluido el intervalo " + intervalInside);
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
  },
  // get the list of criticalIntervals of a specific table
  fetch: async function (request, reply)
  {
    try
    {
      const criticalTableId = request.params.id;
      //check if request.params.id has a valid length for an Id
      if ((criticalTableId.length != 12) && (criticalTableId.length != 24))
      {
        reply.code(400).send("El Id " + criticalTableId + " no tiene un longitud válida");
        return;
      }
      //check if request.params.id is a valid Id
      const validId = new ObjectId(criticalTableId);
      if (criticalTableId != validId)
      {
        reply.code(400).send("El Id " + criticalTableId + " no es válido");
        return;
      }
      //check if attackTableId not exist
      if (!(await utils.checkId(criticalTableId,criticalTableModel)))
      {
        reply.code(400).send("No existe ningun criticalTable con Id " + criticalTableId);
        return;
      }
      // all checks passed ok
      const criticalIntervals = await criticalIntervalModel.find({table:criticalTableId})
                                 .populate({
                                   path: "table",
                                   select: "-_id -__v"
                                 });

      reply.code(200).send(criticalIntervals);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // delete an criticalInterval
  delete: async function (request, reply)
  {
    try 
    {
      const criticalIntervalId = request.params.id;
      //check if request.params.id has a valid length for an Id
      if ((criticalIntervalId.length != 12) && (criticalIntervalId.length != 24))
      {
        reply.code(400).send("El Id " + criticalIntervalId + " no tiene un longitud válida");
        return;
      }
      //check if request.params.id is a valid Id
      const validId = new ObjectId(criticalIntervalId);
      if (criticalIntervalId != validId)
      {
        reply.code(400).send("El Id " + criticalIntervalId + " no es válido");
        return;
      }
      const criticalIntervalToDelete = await utils.checkId(criticalIntervalId,criticalIntervalModel);
      //check if attackIntervalId not exist
      if (!(criticalIntervalToDelete))
      {
        reply.code(400).send("No existe ningun criticalInterval con Id " + criticalIntervalId);
        return;
      }
      // all checks passed ok
      await criticalIntervalModel.findByIdAndDelete(criticalIntervalId);
      reply.code(200).send(criticalIntervalToDelete);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}

module.exports = criticalIntervalController;