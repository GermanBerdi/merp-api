// skill
// - name        (nombre de la habilidad)
// - skillTypeId (SkillType al que pertenece la habilidad)

const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  "name"        : {type: String, required: true},
  "skillTypeId" : {type: mongoose.Schema.ObjectId, required :true}
});

const skill = mongoose.model("skill", skillSchema);

module.exports = skill;