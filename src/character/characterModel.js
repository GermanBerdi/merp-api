//notes:              (PJ = Personaje Jugador)

// character          
// name               (nombre del PJ) 
// race               (raza del PJ)
// lifePoints         (puntos del vida del PJ)
// armor              (armor del PJ)
// rightHand          (objeto en la mano derecha)

const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  "name"        : {type: String, required: true},
  "race"        : {type: String, required: true},
  "lifePoints"  : {type: Number, required: true},
  "armor"       : {type: mongoose.Schema.ObjectId, required: true, ref: "armor"},
  "rightHand"   : {type: mongoose.Schema.ObjectId, required: true, ref: "weapon"}
});

const character = mongoose.model("character", characterSchema);

module.exports = character;