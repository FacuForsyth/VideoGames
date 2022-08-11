const axios = require('axios');
const API_KEY = process.env.DB_API_KEY;
const {Genero} = require("../db.js")

const getGeneroApi= async ()=> {
    try {
        let generos = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results.map(e=> e.name);
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