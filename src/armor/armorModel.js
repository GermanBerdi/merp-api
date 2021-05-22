// armor
// - name           (nombre del armor)
// - armorTypeId    (armorType del armor que le brindara ciertas caracteristicas)
// - defensiveBonus (bonificacion a la defensa)
// - movementBonus  (bonificacion a la Maniobre y Movimiento) 

const mongoose = require("mongoose");

const armorSchema = new mongoose.Schema({
  "name"           : {type: String, required: true},
  "armorTypeId"    : {type: mongoose.Schema.ObjectId, required: true},
  "defensiveBonus" : {type: Number},
  "movementBonus"  : {type: Number}
});

const armor = mongoose.model("armor", armorSchema);

module.exports = armor;