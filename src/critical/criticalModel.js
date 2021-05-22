// critical
// - level    (nivel del critico)
// - modifier (modificador que se aplica a la tirada de critico con un critico de este nivel)

const mongoose = require("mongoose");

const criticalSchema = new mongoose.Schema({
  "level"    : {type: String, required: true},
  "modifier" : {type: Number, required: true}
});

const critical = mongoose.model("critical", criticalSchema);

module.exports = critical;