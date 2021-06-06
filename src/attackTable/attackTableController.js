const attackTableModel = require("./attackTableModel");

const ObjectId         = require("mongoose").Types.ObjectId;
const utils            = require("../utils");

const attackTableController = 
{
  // create an AttackTable
  create: async function (request, reply)
  {
    try 
    {
      const attackTable = request.body;
      // check if the attackTable alredy exist
      if (await utils.checkExist("name", attackTable.name, attackTableModel))
      {
        reply.code(400).send("Ya existe una attackTable con name " + attackTable.name);
        return;
      }
      // all checks passed ok
      const newattackTable = await attackTableModel.create(attackTable);
      reply.code(201).send(newattackTable);
    } 
    catch (e)
    {
      reply.code(500).send(e);
    }
  },
  // get the list of attackTables
  fetch: async function (request, reply)
  {
    try
    {
      const attackTables = await attackTableModel.find({});
      reply.code(200).send(attackTables);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  },
  // delete an attackTable
  delete: async function (request, reply)
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
      const attackTableToDelete = await utils.checkId(attackTableId,attackTableModel);
      //check if attackTableId not exist
      if (!(attackTableToDelete))
      {
        reply.code(400).send("No existe ningun tableAttack con Id " + attackTableId);
        return;
      }
      // all checks passed ok
      await attackTableModel.findByIdAndDelete(attackTableId);
      reply.code(200).send(attackTableToDelete.name);
    } 
    catch (e) 
    {
      reply.code(500).send(e);
    }
  }
}

module.exports = attackTableController;