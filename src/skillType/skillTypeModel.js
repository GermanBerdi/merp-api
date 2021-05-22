// skillType
// - name (nombre del skillType):
//      * movement maneuver (habilidades de maniobra y movimiento)
//      * weapon skill      (habilidades con armas)

// constant API uses to verify that a skill required to use an armor-type has a "movement manouver" skillType
// constant API uses to verify that a skill required to use a weapon has a "weapon skill" skillType
const contents = {
  "movementManouver" : "movement manouver",
  "weaponSkill"      : "weapon skill"
}

const mongoose = require("mongoose");

const skillTypeSchema = new mongoose.Schema({
  "name" : {type: String, required: true}
});

const skillType = mongoose.model("skillType", skillTypeSchema);

module.exports          = skillType;
module.exports.contents = contents;