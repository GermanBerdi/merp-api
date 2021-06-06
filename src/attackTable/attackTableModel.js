// attackTable
// - name      (name of the attack table)

const mongoose = require("mongoose");

const attackTableSchema = new mongoose.Schema({
  "name" : {type: String, required: true}
});

const attackTable = mongoose.model("attackTable", attackTableSchema);

module.exports = attackTable;