const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const apiKey = '8e6a0d3d6edc487097d8fcc85b9e6b10'

const { Genero, Videogame } = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//TRAIGO GAMES DE LA API
const getAPI = async () => {
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
            genres: i.genres.map(i => i.name),  //array con los generos string
            platforms: i.platforms.map(p => p.platform.name) //array con los generos string
        }
    })
    return info;
};

//TRAIGO DE LA BD
const getDB = async () => {
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
const getVideogames = async () => {
    const infoApi = await getAPI();
    const infoDB = await getDB();
    const informacion = infoApi.concat(infoDB);
    return informacion;
};

router.get('/videogames', async (req, res) => {
    const name = req.query.name     //buscar que exista un quere name en la url
    let videogamesT = await getVideogames();
    //let videogamesT = await getAPI();
    if (name) {
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

router.post('/videogames', async (req, res) => {
    let { name, descripcion, relased, rating, platforms, genres, createdInDb } = req.body;

    platforms = platforms?.join(', ')

    try {
        const videogameCreated = await Videogame.findOrCreate({
            where: { 
                name,
                descripcion, 
                relased, 
                rating, 
                platforms,
                createdInDb
            }
        })
        let generoDb = await Genero.findAll({
            where : {name : genres}
        })

        await videogameCreated[0].addGenero(generoDb)

    }
    catch (e) {
        console.log(e);
    }
    res.send('video juego creado correctamente')
})

//por ID
router.get('/videogame/:id', async (req, res) => {
    const { id } = req.params;
    const videogamesTotal = await getVideogames()
    if(id) {
        let gameId = await videogamesTotal.filter(i => i.id == id)
        gameId.length ? res.status(200).json(gameId) : res.status(404).send('No se encontro el juego');
    }
})

//GENEROS
/* router.get('/genres', async (req, res) => {

}) */

module.exports = router;