const weaponTypeModel = require("./weaponTypeModel");
const utils          = require("../utils");

module.exports =
{
  //# create a weaponType
  create: async (request, reply) =>
  {
    try 
    {
      const weaponType = request.body;
      // check if the weaponType alredy exist
      if (await utils.checkExist("name", weaponType.name, weaponTypeModel)) 
      {
        reply.code(201).send("Ya existe un weaponType con name " + weaponType.name);
        return;
      }
      // all checks passed ok   
      const newWeaponType = await weaponTypeModel.create(weaponType);
      reply.code(201).send(newWeaponType);
    } 
    catch (e)
    {
      reply.code(500).send(e);
    }
  }
}