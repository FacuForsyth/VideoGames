const axios = require('axios');
//const API_KEY = process.env.DB_API_KEY;
const { Genero, Videogame } = require('../db');


//TRAIGO GAMES DE LA API
const getAPI = async () => {
    let res = (await axios.get(`https://api.rawg.io/api/games?key=${process.env.DB_API_KEY}`)).data;
    let res1 = (await axios.get(`${res.next}`)).data;
    let res2 = (await axios.get(`${res1.next}`)).data;
    let res3 = (await axios.get(`${res2.next}`)).data;
    let res4 = (await axios.get(`${res3.next}`)).data;
    let videogames = [...res.results, ...res1.results, ...res2.results, ...res3.results, ...res4.results]
 
    const info = videogames.map(i => {
        return {
            name: i.name,
            id: i.id, 
            relased: i.released,
            rating: i.rating,
            image: i.background_image,
            descripcion: i.descripcion,
            //map de generos y de plataformas 
            //si los quiero como todo un string
            //platforms: i.platforms && i.platforms.map((p) => p.platform.name).join(", "),  
            //genres: i.genres && i.genres.map((g) => g.name).join(", "), 
            //si los quiero como un array
            generos: i.genres.map(i => i.name),  //array con los generos string
            platforms: i.platforms.map(p => p.platform.name) //array con las plataformas string
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
    //mappear para que los generos me los devuelva en un array separados por string c/u
    infoDB.map((v) => {
        //console.log(v)
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

module.exports = {getVideogames, getDB}