const skillController = require("./skillController");

function skillRoutes (app)
{
    // create a skill
    app.post("/api/skill", skillController.create);

    // get the list of skill
    app.get("/api/skill", skillController.fetch);

    // delete a skill
    app.delete("/api/skill/:id", skillController.delete);
}

module.exports = skillRoutes;