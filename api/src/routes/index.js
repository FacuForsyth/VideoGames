const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Genero, Videogame } = require('../db');
const { getGeneroApi } = require('../controllers/generos');
const { getVideogames } = require('../controllers/videogames');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async (req, res) => {
    const name = req.query.name     //buscar que exista un quere name en la url
    let videogamesT = await getVideogames();
    if (name) {
        //filtro y veo si ese name que me pasan por query esta incluido
        //toLowerCase() para pasarlo a minuscula , asi compara los 2 valores en minuscula
        let videogameName = await videogamesT.filter(i => i.name.toLowerCase().includes(name.toLowerCase()));
        videogameName.length ? 
            res.status(200).send(videogameName) :
            res.status(404).send('No se encuentra el VideoJuego');
    }
    else {
        res.status(200).send(videogamesT);
    }
});

// CREAR JUEGO
router.post('/videogames', async (req, res) => {
    let { name, descripcion, relased, rating, image, createdInDb, platforms, generos } = req.body;
    platforms = platforms.join(', ')

    try {
        const videogameCreated = await Videogame.findOrCreate({
            where: { 
                name,
                descripcion, 
                relased, 
                rating,
                image,  //agregar en el req.body 
                createdInDb, //tiene un defaultValue: true por eso la crea en true
                platforms,
            }
        })
        // por nombre
         let generoDb = await Genero.findAll({
            where : {name : generos}
        });
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
    const videogamesTotal = await getVideogames();
    if(id) {
        let gameId = await videogamesTotal.filter(i => i.id == id)
        gameId.length ? res.status(200).json(gameId) : res.status(404).send('No se encontro el juego');
    }
});

//GENEROS
router.get('/genres', async (req, res) => {
    const generos = await getGeneroApi();
    res.send(generos);
})

module.exports = router;