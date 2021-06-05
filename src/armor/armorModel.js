// armor
// - name           (nombre del armor)
// - armorType      (armorType del armor que le brindara ciertas caracteristicas)
// - defensiveBonus (bonificacion a la defensa)
// - movementBonus  (bonificacion a la Maniobra y Movimiento) 

const mongoose = require("mongoose");

const armorSchema = new mongoose.Schema({
  "name"           : {type: String, required: true},
  "armorType"      : {type: mongoose.Schema.ObjectId, required: true, ref: "armorType"},
  "defensiveBonus" : {type: Number},
  "movementBonus"  : {type: Number}
});

const armor = mongoose.model("armor", armorSchema);

module.exports = armor;