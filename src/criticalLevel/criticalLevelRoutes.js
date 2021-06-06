const criticalLevelController = require("./criticalLevelController");

function criticalLevelRoutes (app)
{
    // create a criticalLevel
    app.post("/api/critical-level", criticalLevelController.create);

    // get the list of criticalLevels
    app.get("/api/critical-level", criticalLevelController.fetch);

    // delete a criticalLevel
    app.delete("/api/critical-level/:id", criticalLevelController.delete);
}

module.exports = criticalLevelRoutes;