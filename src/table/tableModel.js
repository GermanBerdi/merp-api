// table
// - name      (nombre de la tabla de ataques)
// - tableType (attack          ----> tabla de ataques, 
//             (critical        ----> tabla de criticos, 
//             (resistance roll ----> tabla de tiradas de resistencia)

// constant API uses to verify that an attacktInterval has a tableId wich has an "attack" tableType, ...
//                          ...that an critialInterval has a tableId wich has a "critical" tableType

const tableType = {
  "attack"         : "attack",
  "critical"       : "critical",
  "resistanceRoll" : "resistance roll"
};

const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  "name"      : {type: String, required: true},
  "tableType" : {type: String, required: true, enum: Object.keys(tableType)}
});

const table = mongoose.model("table", tableSchema);

module.exports           = table;
module.exports.tableType = tableType;