const criticalTableModel = require("./criticalTableModel");

const ObjectId         = require("mongoose").Types.ObjectId;
const utils            = require("../utils");

const criticalTableController = 
{
  // create a criticalTable
  create: async function (request, reply)
  {
    try 
    {
      const criticalTable = request.body;
      // check if the criticalTable alredy exist
      if (await utils.checkExist("name", criticalTable.name, criticalTableModel))
      {
        reply.code(400).send("Ya existe una criticalTable con name " + criticalTable.name);
        return;
      }
      // all checks passed ok
      const newCriticalTable = await criticalTableModel.create(criticalTable);
      reply.code(201).send(newCriticalTable);
    } 
    catch (e)
    {
      reply.code(500).send(e);
    }
  },
  // get the list of criticalTables
  fetch: async function (request, reply)
  {
    try
    {
      const criticalTables = await criticalTableModel.find({});
      reply.code(200).send(criticalTables);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // delete a criticalTable
  delete: async function (request, reply)
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
      const criticalTableToDelete = await utils.checkId(criticalTableId,criticalTableModel);
      //check if criticalTableId not exist
      if (!(criticalTableToDelete))
      {
        reply.code(400).send("No existe ningun attackTable con Id " + criticalTableId);
        return;
      }
      // all checks passed ok
      await criticalTableModel.findByIdAndDelete(criticalTableId);
      reply.code(200).send(criticalTableToDelete.name);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}

module.exports = criticalTableController;