// weapon
// name               (nombre del arma. Por ejemplo, espada ancha)
// description        (descripcion del arma. Por ejemplo, espada de la cienaga con veneno)
// skill              (habilidad que suma su bonificacion al uso del arma. Tiene que ser un skillType weapon skill)
// tableId            (tabla en la que se resuelve el ataque del arma. Tiene que ser un tableType attack)
// criticals[]        (array de criticos que inflinge el arma)
//   criticalTable    (tabla en la que se resuelve el critico del arma)
//   criticalSeverity (severidad del critico. 0 mismo que el resultado del ataque en la tabla de ataque...)
//                    (...+1 un level superior que el resultado del ataque en la tabla de ataque...)
//                    (...-1 un level inferior que el resultado del ataque en la tabla de ataque, etc)
//   criticalMax      (level maximo de critico que puede alcanzar el critico descrito)
//                            
// armorPiercing[]   (array de malus/bonus que tiene el arma contra determinados armorType
//   armortypeId     (armorTypeId contra el que tiene un modificador)
//   bonus           (modificador que tiene contra esa armadura)
// fisicalBonus      (modificador general del arma por razones de fabricacion)
// fisicalBonus      (modificador general del arma por razones mágicas)
// weaponTypeId      (weaponType del arma que le brindara un modicador cuando haga ciertos...)
//                   (...ataques contra grandes criaturas o de una raza específica)
// TODO:
// bonusBO raza +5 contra orcos¿?
// bonusBO alineamiento¿?
// Sagrada contra una raza? Exterminadora de una raza o alineamiento?

const mongoose = require("mongoose");

const weaponSchema = new mongoose.Schema({
  "name"          : {type: String, required :true},
  "description"   : {type: String, required :true},
  "skill"         : {type: mongoose.Schema.ObjectId, required :true},
  "attackTable"   : {type: mongoose.Schema.ObjectId, required :true}, 
  "criticals"     : [{
                      "criticalTable"    : {type: mongoose.Schema.ObjectId, required :true},
                      "criticalSeverity" : {type: Number, required :true},
                      "criticalMax"      : {type: mongoose.Schema.ObjectId, required :true}
                    }],
  "armorPiercing" : [{
                      "armorType" : {type: mongoose.Schema.ObjectId, required :true},
                      "bonus"     : {type: Number, required :true}
                    }],
  "fisicalBonus"  : {type: Number},
  "magicalBonus"  : {type: Number},
  "weaponType"    : {type: mongoose.Schema.ObjectId, required :true}
});

const weapon = mongoose.model("weapon", weaponSchema);

module.exports = weapon;