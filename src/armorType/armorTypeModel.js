// armorType
// - name        (nombre del armor_type)
// - endurance   (determina que columna usar de la tabla de ataque que utilice el arma del atacante...)
//               (...tal y como esta estructurado el schema de los intervalos de ataque es para saber...)
//               (...que intervalo mirar. Describe de cierto modo la proteccion que brinda la armadura)
// - skill       (habilidad que suma su bonificacion al uso de la armadura. Tiene que ser un skillType movement maneuver)
// - encumbrance (modificador que se aplica a Maniobra y Moviemiento con esta clase de armadura)
//               (segun las reglas "sin armadura 0, cuero -15, cuero endurecido -30, cota de malas -45, coraza -60")

//TODO:
// - essence         (para saber si se puede hacer magia de esencia con esta clase de armadura)
// - chanelling      (para saber si se puede hacer magia de canalizacion con esta clase de armadura)
// - invulnerability (para saber si es invulnerable a armas normales, magicas, mithril, sagradas, exterminadoras)


const mongoose = require("mongoose");

const armorTypeSchema = new mongoose.Schema({
  "name"        : {type: String, required: true},
  "endurance"   : {type: mongoose.Schema.ObjectId, required: true, ref: "endurance"},
  "skill"       : {type: mongoose.Schema.ObjectId, required: true, ref: "skill"},
  "encumbrance" : {type: Number, required: true}
});

const armorType = mongoose.model("armorType", armorTypeSchema);

module.exports = armorType;