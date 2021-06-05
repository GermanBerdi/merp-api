const skillTypeRoutes = require("../skillType/skillTypeRoutes");
const skillRoutes     = require("../skill/skillRoutes");
const enduranceRoutes = require("../endurance/enduranceRoutes");
const armorTypeRoutes = require("../armorType/armorTypeRoutes");
const armorRoutes     = require("../armor/armorRoutes");

// const tableController            = require("../table/tableController");
// const criticalController         = require("../critical/criticalController");
// const attackIntervalController   = require("../table/attackIntervalController");
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
}

module.exports = routes;