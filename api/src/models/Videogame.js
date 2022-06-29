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
      type: DataTypes.DECIMAL(4,2), // el numero decimal puede tener 4 dígitos como máximo y de esos 4 digitos 2 se encuentran después de la coma,
      allowNull: true,
      /* validate: {
        min: 0,
        max: 10
      } */
    },
    image:{
      type: DataTypes.TEXT,
      defaultValue: "https://img.freepik.com/vector-gratis/controles-videojuegos-estilo-neon-pared-ladrillo_24908-58916.jpg"
    },
    platforms: {
      type: DataTypes.STRING, //.ENUM('PC', 'Nintendo Switch', 'Xbox Series S/X', 'PlayStation 4', 'PlayStation 5')
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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