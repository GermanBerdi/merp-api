const criticalTableController    = require("./criticalTableController");
const criticalIntervalController = require("./criticalIntervalController");

function criticalTableRoutes (app)
{
    // create a criticalTable
    app.post("/api/critical-table", criticalTableController.create);

    // get the list of criticalTables
    app.get("/api/critical-table", criticalTableController.fetch);

    // delete a criticalTable
    app.delete("/api/critical-table/:id", criticalTableController.delete);

    // create a criticalInterval
    app.post("/api/critical-interval", criticalIntervalController.create);

    // get the list of criticalIntervals of a specific table
    app.get("/api/critical-interval/:id", criticalIntervalController.fetch);

    // delete a criticalInterval
    app.delete("/api/critical-interval/:id", criticalIntervalController.delete);
}

module.exports = criticalTableRoutes;