// weaponType
// - name (nombre del tipo de arma)
//      * normal  (norma -20)
//      * magic   (magica -10)
//      * mithril (mithril 0)
//      * holy    (sagrada +10)
//      * slayer  (exterminadora +20)

const mongoose = require("mongoose");

const weaponTypeSchema = new mongoose.Schema({
  "name"          : {type: String, required: true},
  "criticalBonus" : {type: Number, required: true}
});

const weaponType = mongoose.model("weaponType", weaponTypeSchema);

module.exports = weaponType;