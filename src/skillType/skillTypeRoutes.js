const skillTypeController = require("./skillTypeController");

function skillTypeRoutes (app)
{
    // create a skillType
    app.post("/api/skill-type", skillTypeController.create);

    // get the list of skillTypes
    app.get("/api/skill-type", skillTypeController.fetch);

    // delete a skillTypes
    app.delete("/api/skill-type/:id", skillTypeController.delete);
}

module.exports = skillTypeRoutes;