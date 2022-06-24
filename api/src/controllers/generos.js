const axios = require('axios');
const apiKey = '8e6a0d3d6edc487097d8fcc85b9e6b10';
const {Genero} = require("../db.js")

//router.get('/generos, async (req, res) => {  res.send(generosBD)})
const getGeneroApi= async ()=> {
    try {
        let generos = (await axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`)).data.results.map(e=> e.name);
        //console.log(generos) //[sport , card , car]
        generos.map(e=> {
            Genero.findOrCreate({
                where: {
                    name: e //toLowerCase()
                }
            })
        })
        const generosDB = await Genero.findAll();
        console.log("guardado en DB");
        return generosDB;
        
    }
    catch(e){
        return(e)     //para usar el middleware armado en app
    }
};

module.exports = {getGeneroApi}