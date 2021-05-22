const enduranceModel = require("./enduranceModel");
const utils          = require("../utils");

module.exports =
{
  //# create an endurance
  create: async (request, reply) =>
  {
    try 
    {
      const endurance = request.body;
      // check if the endurance alredy exist
      if (await utils.checkExist("name", endurance.name, enduranceModel)) 
      {
        reply.code(201).send("Ya existe un endurance con name " + endurance.name);
        return;
      }
      // all checks passed ok   
      const newEndurance = await enduranceModel.create(endurance);
      reply.code(201).send(newEndurance);  
    } 
    catch (e)
    {
      reply.code(500).send(e);
    }
  }
}