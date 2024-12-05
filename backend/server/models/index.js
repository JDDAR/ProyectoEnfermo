const User = require("./userModel");
const Pet = require("./petModel");
const Agenda = require("./agendaModel");
const Rol = require("./rolModel");
const Race = require("./raceModel");
const HistorialClinico = require("./historialModel");
const Especialidades = require("./especialidadesModels");

// Exporta todos los modelos
module.exports = {
  User,
  Pet,
  Agenda,
  Rol,
  Race,
  HistorialClinico,
  Especialidades,
};
