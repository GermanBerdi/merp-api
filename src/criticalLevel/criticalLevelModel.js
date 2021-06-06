// criticalLevel
// - level    (nivel del critico)
// - modifier (modificador que se aplica a la tirada de critico con un critico de este nivel)
//      * "name":"T" significa que hubo critico, modificador a la tirada de critico -50
//      * "name":"A" significa que hubo critico, modificador a la tirada de critico -20
//      * "name":"B" significa que hubo critico, modificador a la tirada de critico -10
//      * "name":"C" significa que hubo critico, modificador a la tirada de critico 0
//      * "name":"D" significa que hubo critico, modificador a la tirada de critico 10
//      * "name":"E" significa que hubo critico, modificador a la tirada de critico 20

const mongoose = require("mongoose");

const criticalLevelSchema = new mongoose.Schema({
  "name"     : {type: String, required: true},
  "modifier" : {type: Number, required: true}
});

const criticalLevel = mongoose.model("criticalLevel", criticalLevelSchema);

module.exports = criticalLevel;