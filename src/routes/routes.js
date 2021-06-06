const skillTypeRoutes     = require("../skillType/skillTypeRoutes");
const skillRoutes         = require("../skill/skillRoutes");
const enduranceRoutes     = require("../endurance/enduranceRoutes");
const armorTypeRoutes     = require("../armorType/armorTypeRoutes");
const armorRoutes         = require("../armor/armorRoutes");
const criticalLevelRoutes = require("../criticalLevel/criticalLevelRoutes");
const attackTableRoutes   = require("../attackTable/attackTableRoutes");

// const criticalIntervalController = require("../table/criticalIntervalController");
// const weaponTypeController       = require("../weaponType/weaponTypeController");
// const weaponController           = require("../weapon/weaponController");

function routes (app)
{
  skillTypeRoutes(app);
  skillRoutes(app);
  enduranceRoutes(app);
  armorTypeRoutes(app);
  armorRoutes(app);
  criticalLevelRoutes(app);
  attackTableRoutes(app);
}

module.exports = routes;