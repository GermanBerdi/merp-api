const enduranceController = require("./enduranceController");

function enduranceRoutes (app)
{
    // create an endurance
    app.post("/api/endurance", enduranceController.create);

    // get the list of endurances
    app.get("/api/endurance", enduranceController.fetch);

    // delete an endurance
    app.delete("/api/endurance/:id", enduranceController.delete);
}

module.exports = enduranceRoutes;