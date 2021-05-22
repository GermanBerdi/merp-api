// endurance
// - name (nombre de la resistencia a los ataques)
//
// esta coleccion de documentos servira para que cada armorType pueda definir...
// ...en que "columna" de la tabla de ataque resuelve los atsaques que recibe.

const mongoose = require("mongoose");

const enduranceSchema = new mongoose.Schema({
  "name" : {type: String, required: true}
});

const endurance = mongoose.model("endurance", enduranceSchema);

module.exports = endurance;