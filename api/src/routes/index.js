const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const apiKey = '8e6a0d3d6edc487097d8fcc85b9e6b10'

const {Genero, Videogame} = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//TRAIGO GAMES DE LA API
const getAPI= async ()=> {
    const videogames = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}`);

    const info = await videogames.data.results.map(i => {
        return {
            name: i.name,
            id: i.id, // uuidv4
            relased: i.released,
            rating: i.rating,

            image: i.ibackground_image,
            descripcion: i.descripcion,    
            
            //map de generos y de plataformas , xq devuelve un arreglo
            generes: i.genres.map(i => i.name),  //array con los generos string
            //plataforms: i.plataforms.map(i => i), 
        }
    })
    return info;
};

//TRAIGO DE LA BD
const getDB = async ()=> {
    return await Videogame.findAll({
        include: {
            model: Genero,
            attributes: ['name'],
            //traer los atributos
            through: {
                attributes: [],
            }
        }
    })
};

//concatenar lo de la api y la bd
const getVideogames = async ()=> {
    const infoApi = await getAPI();
    const infoDB = await getDB();
    const informacion = infoApi.concat(infoDB);
    return informacion;
};

router.get('/', async(req,res)=> {      // O ES /VIDEOGAME S ??
    const name = req.query.name     //buscar que exista un quere name en la url
    let videogamesT = await getVideogames();
    //let videogamesT = await getAPI();
    if(name){
        //filtro y veo si ese name que me pasan por query esta incluido
        //toLowerCase() para pasarlo a minuscula , asi compara los 2 valores en minuscula
        let videogameName = await videogamesT.filter(i => i.name.toLowerCase().includes(name.toLowerCase()));

        videogameName.length ? res.status(200).send(videogameName) : 
        res.status(404).send('No se encuentra el VideoJuego');
    }
    else {
        res.status(200).send(videogamesT);
    }
});

module.exports = router;