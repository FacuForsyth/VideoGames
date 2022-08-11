const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Genero, Videogame } = require('../db');
const { getGeneroApi } = require('../controllers/generos');
const { getVideogames, getDB } = require('../controllers/videogames');
const { default: axios } = require('axios');
const router = Router();
const API_KEY = process.env.DB_API_KEY;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async (req, res) => {
    const name = req.query.name     //buscar que exista un query name en la url
    
    let videogamesT = await getVideogames();
  try{
    if (name) {
        //filtro y veo si ese name que me pasan por query esta incluido
        //toLowerCase() para pasarlo a minuscula , asi compara los 2 valores en minuscula
        let videogameName = videogamesT.filter(i => i.name.toLowerCase().includes(name.toLocaleLowerCase()));
        //console.log(videogameName)
        videogameName.length ? 
            res.status(200).send(videogameName) :
            res.status(404).send('No se encuentra el VideoJuego');
    }
    else {
        res.status(200).send(videogamesT);
    }
  } catch(e){
    console.log(e);
  }  
});

// CREAR JUEGO
router.post('/videogame', async (req, res) => {
    let { name, descripcion, relased, rating, image, platforms, generos } = req.body;
    platforms = platforms.join(', ')

    try {
        const videogameCreated = await Videogame.findOrCreate({
            where: { 
                name,
                descripcion, 
                relased, 
                rating,
                image,
                platforms,
            }
        })
        // por nombre
         var generoDb = await Genero.findAll({
            where : {name : generos}
        });
        //guardo la info en la tabla por el nombre
        await videogameCreated[0].addGenero(generoDb);
    } 
    catch (e) {
        console.log(e);
    }
    res.send('video juego creado correctamente');
});

//por ID
router.get('/videogames/:id', async (req, res) => {
    const { id } = req.params;
    
    if (id.includes('-')) {
        let videogameDb = await Videogame.findOne({
            where: {
                id: id,
            },
            include: Genero
        })
        res.json(videogameDb)
    } else {
    try {
    const i = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    //console.log('esto es i:', i)
    var a = i.data
    //console.log('esto es a:', a);
    const info = {
            name: a.name,
            id: a.id, 
            relased: a.released,
            rating: a.rating,
            image: a.background_image,
            descripcion: a.description,
            generos: a.genres,
            platforms: a.platforms.map(p => p.platform.name).join(', ')
    }
    res.status(200).json(info)
    }
    catch(e){
        console.log(e)
    }
    }
});

//GENEROS
router.get('/genres', async (req, res) => {
    const generos = await getGeneroApi();
    res.send(generos);
})

module.exports = router;