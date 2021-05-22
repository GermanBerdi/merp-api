const tableModel = require("./tableModel");
const utils      = require("../utils");

module.exports = 
{
  //# create an table
  create: async (request, reply) => 
  {
    try 
    {
      const table = request.body;
      // check if the table alredy exist
      if (await utils.checkExist("name", table.name, tableModel))
      {
        reply.code(201).send("Ya existe una table con name " + table.name);
        return;
      }
      // all checks passed ok
      const newtable = await tableModel.create(table);
      reply.code(201).send(newtable);
    } 
    catch (e)
    {
      reply.code(500).send(e);
    }
  }
}