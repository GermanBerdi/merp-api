const criticalModel = require("./criticalModel");
const utils         = require("../utils");

// "level":"T" significa que hubo critico, modificador a la tirada de critico -50
// "level":"A" significa que hubo critico, modificador a la tirada de critico -20
// "level":"B" significa que hubo critico, modificador a la tirada de critico -10
// "level":"C" significa que hubo critico, modificador a la tirada de critico 0
// "level":"D" significa que hubo critico, modificador a la tirada de critico 10
// "level":"E" significa que hubo critico, modificador a la tirada de critico 20

module.exports =
{
  //# create a critical
  create: async (request, reply) =>
  {
    try
    {
      const critical = request.body;
      // check if the critical alredy exist
      if (await utils.checkExist("level", critical.level, criticalModel))
      {
        reply.code(201).send("Ya existe un critical con level " + critical.level);
        return;
      }
      const newCritical = await criticalModel.create(critical);
      reply.code(201).send(newCritical);
    } 
    catch (e)
    {
      reply.code(500).send(e);
    }
  }
}