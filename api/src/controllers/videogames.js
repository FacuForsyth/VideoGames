const axios = require('axios');
const apiKey = '8e6a0d3d6edc487097d8fcc85b9e6b10'
const { Genero, Videogame } = require('../db');


//TRAIGO GAMES DE LA API
const getAPI = async () => {
    const videogames = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}`);

    const info = await videogames.data.results.map(i => {
        return {
            name: i.name,
            id: i.id, 
            relased: i.released,
            rating: i.rating,
            image: i.ibackground_image,
            descripcion: i.descripcion,
            //map de generos y de plataformas 
            //si los quiero como todo un string
            platforms: i.platforms && i.platforms.map((p) => p.platform.name).join(", "),  
            //genres: i.genres && i.genres.map((g) => g.name).join(", "), 
            //si los quiero como un array
            generos: i.genres.map(i => i.name),  //array con los generos string
            //platforms: i.platforms.map(p => p.platform.name) //array con los generos string
        }
    })
    return info;
};

//TRAIGO DE LA BD
const getDB = async () => {
    let infoDB = await Videogame.findAll({
        include: {
            model: Genero,
        },
    });
    /*infoDB.map((v) => {
        return (v.dataValues['platforms'] = v.dataValues['platforms'].map((p) => p.dataValues.name));
    }); */
    //mappear para que los generos me los devuelva en un array separados por string c/u
    infoDB.map((v) => {
        return (v.dataValues['generos'] = v.dataValues['generos'].map((g) => g.dataValues.name));
    });
    infoDB = infoDB.map((v) => v.dataValues);
    return infoDB
};

//concatenar lo de la api y la bd
const getVideogames = async () => {
    const infoApi = await getAPI();
    const infoDB = await getDB();
    const informacion = infoDB.concat(infoApi);
    return informacion;
};

module.exports = {getVideogames}