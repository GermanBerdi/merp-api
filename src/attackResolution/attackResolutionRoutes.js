const attackResolutionController = require("./attackResolutionController");

function attackResolutionRoutes (app)
{
    // attacker attack defender
    app.post("/api/attackResolution/:attacker/:defender", attackResolutionController.attack);
}

module.exports = attackResolutionRoutes;