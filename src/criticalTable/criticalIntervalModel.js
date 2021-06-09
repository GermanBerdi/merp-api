// criticalInterval
// - table           (id de la tabla a la que pertenece)
// - min             (para saber si el resultado de un ataque hace el daño de este intervalo...)
// - max             (...tiene que estar entre el minimo y maximo)
// - lifePoint       (puntos de vida que se pierden como resultado de recibir un critico)
// - description     (descripcion de la escena resultante del critico)
// - activityPenalty (penalidad a la activdad como resultado de recibir un critico)
//       - value     (-X a la actividad)
//       - assaults  (durante X asaltos. -1 podria siginificar hasta final del combate)
// - hemorrhage      (perdida de puntos de vida por asalto como resultado de recibir un critico)
//       - value     (-X puntos de vida)
//       - assaults  (durante X asaltos. -1 podria siginificar hasta final del combate)
// - stunned         (aturdido durante X asaltos)
// - condition       (["muted","immobilized","knocked down","suffocated","unconscious","dead"]...)
//                   (...como resultado recibir un critico)
// - mortallyWounded (herida que causara la muerte en X asaltos)

// TODO:
// hueso roto (costillas)
// extremidad inutilizada(brazo izquierdo)
// organo destruido(ojo)¿?
// condicion infligida dependiendo de si lleva escudo o yelmo¿? (brazo roto si no lleva escudo)
// X probalidad en porcentaje de que tu arma se quede atrapada durante X asaltos
// desplazado X metros como resultaao del golpe?
// Escudo arrancado? el arma se Cae?
// recibe otro critico como resultado de este? 111-116 criticos de presa ¿?
// Atacante aplastado? -20 pv 117-119 criticos fisicos grandes criaturas ¿?

const utils = require("../utils");

const mongoose = require("mongoose");

const criticalIntervalSchema = new mongoose.Schema({
  "table"           : {type: mongoose.Schema.ObjectId, required: true, ref: "criticalTable"},
  "min"             : {type: Number, required: true},
  "max"             : {type: Number, required: true},
  "description"     : {type: String, required: true},
  "lifePoints"      : {type: Number, required: true}, 
  "activityPenalty" : {
                        "value"     : {type: Number},
                        "assaults"  : {type: Number}
                      },
  "hemorrhage"      : {
                        "value"     : {type: Number},
                        "assaults"  : {type: Number}
                      },
  "stunned"         : {type: Number},
  "condition"       : {type: String, enum: Object.values(utils.condition)},
  "mortallyWounded" : {type: Number}
});

const criticalInterval = mongoose.model("criticalInterval", criticalIntervalSchema);

module.exports = criticalInterval;