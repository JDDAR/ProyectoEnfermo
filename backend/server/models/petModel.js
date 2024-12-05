const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./userModel");
const Race = require("./raceModel");
const HistorialClinico = require("./historialModel");

const Pet = sequelize.define("Mascota", {
  idPet: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  namePet: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  fechaNacimientoPet: {
    type: DataTypes.DATE,
  },
  estadoPet: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

Pet.belongsTo(User, { foreignKey: "idUserFk" });
Pet.belongsTo(Race, { foreignKey: "idEspeFk" });
Pet.hasMany(HistorialClinico, { foreignKey: "idPetFk", as: "historial" });

module.exports = Pet;
