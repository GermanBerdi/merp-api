// criticalTable
// - name      (name of the critical table)

const mongoose = require("mongoose");

const criticalTableSchema = new mongoose.Schema({
  "name" : {type: String, required: true}
});

const criticalTable = mongoose.model("criticalTable", criticalTableSchema);

module.exports = criticalTable;