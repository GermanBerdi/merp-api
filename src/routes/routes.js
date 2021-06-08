const skillTypeRoutes     = require("../skillType/skillTypeRoutes");
const skillRoutes         = require("../skill/skillRoutes");
const enduranceRoutes     = require("../endurance/enduranceRoutes");
const armorTypeRoutes     = require("../armorType/armorTypeRoutes");
const armorRoutes         = require("../armor/armorRoutes");
const criticalLevelRoutes = require("../criticalLevel/criticalLevelRoutes");
const attackTableRoutes   = require("../attackTable/attackTableRoutes");
const criticalTableRoutes = require("../criticalTable/criticalTableRoutes");
const weaponTypeRoutes    = require("../weaponType/weaponTypeRoutes");
const weaponRoutes        = require("../weapon/weaponRoutes");

function routes (app)
{
  skillTypeRoutes(app);
  skillRoutes(app);
  enduranceRoutes(app);
  armorTypeRoutes(app);
  armorRoutes(app);
  criticalLevelRoutes(app);
  attackTableRoutes(app);
  criticalTableRoutes(app);
  weaponTypeRoutes(app);
  weaponRoutes(app);
}

module.exports = routes;