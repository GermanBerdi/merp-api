const armorTypeController = require("./armorTypeController");

function armorTypeRoutes (app)
{
    // create an armorType
    app.post("/api/armor-type", armorTypeController.create);

    // get the list of armorTypes
    app.get("/api/armor-type", armorTypeController.fetch);

    // delete an armorType
    app.delete("/api/armor-type/:id", armorTypeController.delete);
}

module.exports = armorTypeRoutes;