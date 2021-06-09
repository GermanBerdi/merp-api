const weaponController    = require("./weaponController");

function weaponRoutes (app)
{
    // create a weapon
    app.post("/api/weapon", weaponController.create);

    // get the list of weapons
    app.get("/api/weapon", weaponController.fetch);

    // delete a weapon
    //app.delete("/api/weapon/:id", weaponController.delete);
}

module.exports = weaponRoutes;