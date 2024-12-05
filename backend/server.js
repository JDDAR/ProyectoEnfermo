require("dotenv").config();
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const cors = require("cors");
const { sequelize } = require("./server/config/database");
const models = require("./server/models");

console.log("Modelos registrados:", Object.keys(models));
console.log("Dependencias cargadas correctamente");

//Configurando variables
const hostname = process.env.HOST || "localhost";
const port = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

//Instanciando Express
const app = express();

//SECRETKEY

//Middlewares
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

//Cargando rutas
require("./server/routes/userRoutes")(app);

//Ruta generica para error 404
app.use((req, res) => {
  res.status(404).send("<h1> 404 : Pagina no encontrada </h1>");
});

//Creando el servidor :
const server = http.createServer(app);
//Iniciando ek servidor y conectandolo a la base de datos
server.listen(port, hostname, async () => {
  console.log(`Servidor funcionando en : http://${hostname}:${port}`);
  try {
    await sequelize.authenticate();
    console.log("La conexion a la base de datos fue exitosa...");
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error("ERROR al conectarse a la base de datos: ", error);
  }
});
