const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
/*       validate: {
        notNull: true,
      } */
    },
    //un id nuevo para que no coincidan bd y api 
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relased: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    rating : {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    //crear otro modelo para plataformas
    platforms: {
      type: DataTypes.STRING,   //.ENUM(plataformas)
      allowNull: false,
    },
  },{timestamps: true,
    createdAt: 'creado',
    updatedAt: false});
};

/* - [ ] Videojuego con las siguientes propiedades:
  - ID: * No puede ser un ID de un videojuego ya existente en la API rawg
  - Nombre *
  - Descripción *
  - Fecha de lanzamiento
  - Rating
  - Plataformas *
 */