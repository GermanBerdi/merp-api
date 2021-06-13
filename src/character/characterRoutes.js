const characterController = require("./characterController");

function characterRoutes (app)
{
    // create a character
    app.post("/api/character", characterController.create);

    // get the list of characters
    //app.get("/api/character", characterController.fetch);

    // delete a character
    //app.delete("/api/character/:id", characterController.delete);
}

module.exports = characterRoutes;