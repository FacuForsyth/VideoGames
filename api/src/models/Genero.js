const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genero', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // no le paso a id por que la bd ya la genera.
  },{timestamps : false})
};

/* - [ ] Genero con las siguientes propiedades:
  - ID
  - Nombre */