const armorController = require("./armorController");

function armorRoutes (app)
{
    // create an armor
    app.post("/api/armor", armorController.create);

    // get the list of armors
    app.get("/api/armor", armorController.fetch);

    // delete an armor
    app.delete("/api/armor/:id", armorController.delete);
}

module.exports = armorRoutes;