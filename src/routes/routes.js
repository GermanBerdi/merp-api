const skillTypeController        = require("../skillType/skillTypeController");
const skillController            = require("../skill/skillController");
const enduranceController        = require("../endurance/enduranceController");
const armorTypeController        = require("../armorType/armorTypeController");
const armorController            = require("../armor/armorController");
const tableController            = require("../table/tableController");
const criticalController         = require("../critical/criticalController");
const attackIntervalController   = require("../table/attackIntervalController");
const criticalIntervalController = require("../table/criticalIntervalController");
const weaponTypeController       = require("../weaponType/weaponTypeController");
const weaponController           = require("../weapon/weaponController");

module.exports = (app) => {
  // create a skillType
  app.post("/api/skill-type", skillTypeController.create);

  // get the list of skillTypes
  app.get("/api/skill-type", skillTypeController.fetch);

  // delete a skillTypes
  app.delete("/api/skill-type/:id", skillTypeController.delete);

  // create a skill
  app.post("/api/skill", skillController.create);

  // create an endurance
  app.post("/api/endurance", enduranceController.create);

  // create an armorType
  app.post("/api/armor-type", armorTypeController.create);
  
  // create an armor
  app.post("/api/armor", armorController.create);

  // create a table
  app.post("/api/table", tableController.create);

  // create a critical
  app.post("/api/critical", criticalController.create);

  // create an attackInterval
  app.post("/api/attack-interval", attackIntervalController.create);

  // create a criticalInterval
  app.post("/api/critical-interval", criticalIntervalController.create);

  // create a weaponType
  app.post("/api/weapon-type", weaponTypeController.create);

  // create a weapon
  app.post("/api/weapon", weaponController.create);
    
    /*
    // get a single note
    app.get('/api/notes/:id', (request, reply) => {});
    
    // update a note
    app.put('/api/notes/:id', (request, reply) => {});
    
    // delete a note
    app.delete('/api/notes/:id', (request, reply) => {});
    */
  };