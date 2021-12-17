// TODO:
// Hay que codificar una funcion "initialize"
// para que verifique si existen:
// 1- En la coleccion skilltypes: 1.1- movement manouver
//                                1.2- weapon skill
// Caso de que no existan las deberia crear o avisar que no se puede inciar

// import fastify & mongoose
const fastify = require("fastify");
const mongoose = require("mongoose");

// initialized Fastify App
const app = fastify();

// import routes
const routes = require("./routes/routes");

// connected fastify to mongoose
try 
{
  mongoose.connect("mongodb://localhost:27017/merpDB",{ useNewUrlParser: true });
} 
catch (e) 
{
  console.error(e);
}

// function initialize
routes(app);

// set application listening on port 5000 of localhost
// set application listening on all available IPv4 interfaces
app.listen(5000, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});