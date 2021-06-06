const attackTableController    = require("./attackTableController");
const attackIntervalController = require("./attackIntervalController");

function attackTableRoutes (app)
{
    // create an attackTable
    app.post("/api/attack-table", attackTableController.create);

    // get the list of attackTables
    app.get("/api/attack-table", attackTableController.fetch);

    // delete an attackTable
    app.delete("/api/attack-table/:id", attackTableController.delete);

    // create an attackInterval
    app.post("/api/attack-interval", attackIntervalController.create);

    // get the list of attackIntervals of a specific table
    app.get("/api/attack-interval/:id", attackIntervalController.fetch);

    // delete an attackInterval
    //app.delete("/api/attack-interval/:id", attackIntervalController.delete);
}

module.exports = attackTableRoutes;