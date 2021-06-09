const weaponTypeController    = require("./weaponTypeController");

function weaponTypeRoutes (app)
{
    // create a weaponType
    app.post("/api/weapon-type", weaponTypeController.create);

    // get the list of weaponTypes
    app.get("/api/weapon-type", weaponTypeController.fetch);

    // delete a weaponType
    app.delete("/api/weapon-type/:id", weaponTypeController.delete);
}

module.exports = weaponTypeRoutes;