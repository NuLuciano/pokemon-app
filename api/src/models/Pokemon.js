const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    img: DataTypes.STRING,
    hp: {
      type: DataTypes.INTEGER,
    },
    attack: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });
};
