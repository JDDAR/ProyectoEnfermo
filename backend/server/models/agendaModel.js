const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./userModel");
const Pet = require("./petModel");

class Agenda extends Model {}

Agenda.init(
  {
    idAgenda: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horaFin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    motivo: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    notaInicial: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    estadoAgenda: {
      type: DataTypes.ENUM("Pendiente", "Confirmada", "Cancelada", "Activo"),
      allowNull: false,
      defaultValue: "Pendiente",
    },
  },
  {
    sequelize,
    modelName: "Agenda",
    tableName: "Agendas",
    timestamps: true,
  },
);

// Definir las asociaciones después de inicializar el modelo
Agenda.belongsTo(User, { foreignKey: "idUsuarioFk", as: "usuario" });
//Agenda.belongsTo(User, { foreignKey: "idMedicoFk", as: "usuario" });
Agenda.belongsTo(Pet, { foreignKey: "idPetFk", as: "mascota" });

module.exports = Agenda;
