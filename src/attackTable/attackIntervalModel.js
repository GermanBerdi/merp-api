// attackInterval
// - table         (id de la tabla a la que pertenece)
// - endurance     (id de la endurance para la que calcula el ataque)
// - min           (para saber si el resultado de un ataque hace el daño de este intervalo...)
// - max           (...tiene que estar entre el minimo y maximo)
// - lifePoint     (puntos de vida que se pierden como resultado de recibir un ataque en este intervalo)
// - criticalLevel (id del critico recibido como resultado de recibir un ataque en este intervalo)

const mongoose = require("mongoose");

const attackIntervalSchema = new mongoose.Schema({
  "table"         : {type: mongoose.Schema.ObjectId, required: true, ref: "attackTable"},
  "endurance"     : {type: mongoose.Schema.ObjectId, required: true, ref: "endurance"},
  "min"           : {type: Number, required: true},
  "max"           : {type: Number, required: true},
  "lifePoints"    : {type: Number, required: true},
  "criticalLevel" : {type: mongoose.Schema.ObjectId, ref: "criticalLevel"}
});

const attackInterval = mongoose.model("attackInterval", attackIntervalSchema);

module.exports = attackInterval;