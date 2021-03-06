const enduranceModel      = require("../endurance/enduranceModel");
const criticalLevelModel  = require("../criticalLevel/criticalLevelModel");
const attackTableModel    = require("./attackTableModel");
const attackIntervalModel = require("./attackIntervalModel");

const ObjectId            = require("mongoose").Types.ObjectId;
const utils               = require("../utils");

const attackIntervalController =  
{
  // create an attackInterval
  create: async function (request, reply)
  {
    try 
    {
      const attackInterval = request.body;   
      // check if the table not exist
      const table = await utils.checkId(attackInterval.table,attackTableModel);
      if (!(table))
      {
        reply.code(400).send("No existe ninguna Table con Id " + attackInterval.table);
        return;
      }   
      // check if the endurance not exist
      const endurance = await utils.checkId(attackInterval.endurance,enduranceModel);
      if (!(endurance))
      {
        reply.code(400).send("No existe ningun endurance con Id " + attackInterval.endurance);
        return;
      }
      // only if criticalLevel is defined...
      if (attackInterval.criticalLevel)
      {
        //... check if the criticalLevel not exist
        const criticalLevel = await utils.checkId(attackInterval.criticalLevel,criticalLevelModel);
        if (!(criticalLevel))
        {
          reply.code(400).send("No existe ningun criticalLevel con Id " + attackInterval.criticalLevel);
          return;  
        }
      }
      //check the minimun is minor than the maximun
      if (attackInterval.min > attackInterval.max)
      {
        reply.code(400).send("El mínimo del rango no puede ser mayor que el máximo");
        return;
      }
      //check that the minimun interval isn´t included in an existing interval
      minInTable = await utils.findNumAttackTable(attackInterval.min,attackInterval.table,attackInterval.endurance,attackIntervalModel);
      if (minInTable)
      {
        reply.code(400).send(attackInterval.min + " ya esta incluido en el intervalo " + minInTable);
        return;
      }
      //check that the maximun interval isn´t included in an existing interval
      maxInTable = await utils.findNumAttackTable(attackInterval.max,attackInterval.table,attackInterval.endurance,attackIntervalModel);
      if (maxInTable)
      {
        reply.code(400).send(attackInterval.max + " ya esta incluido en el intervalo " + maxInTable);
        return;
      }
      //check there is no interval inside the interval
      intervalInside = await utils.findRangeAttackTable(attackInterval.min,attackInterval.max,attackInterval.table,attackInterval.endurance,attackIntervalModel);
      if (intervalInside)
      {
        reply.code(400).send("Entre " + attackInterval.min + " y " + attackInterval.max + " ya esta incluido el intervalo " + intervalInside);
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
  },
  // get the list of attackIntervals of a specific table
  fetch: async function (request, reply)
  {
    try
    {
      const attackTableId = request.params.id;
      //check if request.params.id has a valid length for an Id
      if ((attackTableId.length != 12) && (attackTableId.length != 24))
      {
        reply.code(400).send("El Id " + attackTableId + " no tiene un longitud válida");
        return;
      }
      //check if request.params.id is a valid Id
      const validId = new ObjectId(attackTableId);
      if (attackTableId != validId)
      {
        reply.code(400).send("El Id " + attackTableId + " no es válido");
        return;
      }
      //check if attackTable not exist
      const attackable = await utils.checkId(attackTableId,attackTableModel);
      if (!(attackTable))
      {
        reply.code(400).send("No existe ningun tableAttack con Id " + attackTableId);
        return;
      }
      // all checks passed ok
      const attackIntervals = await attackIntervalModel.find({table:attackTableId})
                                .populate([{
                                  path: "table",
                                  select: "-_id -__v"
                                },{
                                  path: "endurance",
                                  select: "-_id -__v"
                                },{
                                  path: "criticalLevel",
                                  select: "-_id -__v"
                                }]);

      reply.code(200).send(attackIntervals);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // delete an attackInterval
  delete: async function (request, reply)
  {
    try 
    {
      const attackIntervalId = request.params.id;
      //check if request.params.id has a valid length for an Id
      if ((attackIntervalId.length != 12) && (attackIntervalId.length != 24))
      {
        reply.code(400).send("El Id " + attackIntervalId + " no tiene un longitud válida");
        return;
      }
      //check if request.params.id is a valid Id
      const validId = new ObjectId(attackIntervalId);
      if (attackIntervalId != validId)
      {
        reply.code(400).send("El Id " + attackIntervalId + " no es válido");
        return;
      }
      const attackIntervalToDelete = await utils.checkId(attackIntervalId,attackIntervalModel);
      //check if attackIntervalId not exist
      if (!(attackIntervalToDelete))
      {
        reply.code(400).send("No existe ningun attackInterval con Id " + attackIntervalId);
        return;
      }
      // all checks passed ok
      await attackIntervalModel.findByIdAndDelete(attackIntervalId);
      reply.code(200).send(attackIntervalToDelete);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}

module.exports = attackIntervalController;