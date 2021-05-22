// attackInterval
// - tableId     (id de la tabla a la que pertenece)
// - enduranceId (id de la endurance para la que calcula el ataque)
// - min         (para saber si el resultado de un ataque hace el daño de este intervalo)
// - max         (tiene que estar entre el minimo y maximo)
// - lifePoint   (puntos de vida que se pierden como resultado de recibir un ataque en este intervalo)
// - criticalId  (id del critico recibido como resultado de recibir un ataque en este intervalo)

const mongoose = require("mongoose");

const attackIntervalSchema = new mongoose.Schema({
  "tableId"     : {type: mongoose.Schema.ObjectId, required :true},
  "enduranceId" : {type: mongoose.Schema.ObjectId, required :true},
  "min"         : {type: Number, required :true},
  "max"         : {type: Number, required :true},
  "lifePoints"  : {type: Number, required :true},
  "criticalId"  : {type: mongoose.Schema.ObjectId} 
});

const attackInterval = mongoose.model("attackInterval", attackIntervalSchema);

module.exports = attackInterval;