const initialState = {
    videogames: [],
    allVideogames: [],
    generos: [],
    details: {}  
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                 videogames: action.payload,
                 allVideogames: action.payload
            }
        case 'GET_NAME_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,
            }
        case 'GET_GENEROS':
            return{
                ...state,
                generos: action.payload,
            };
        case 'GET_DETAILS':
            return{
                ...state,
                details: action.payload
            }
        case 'POST_VIDEOGAME':
            return{
                ...state,
            };
        case "FILTER_GENERO":
            //console.log('filtered', action.payload)  SI TRAE EL GENERO
            var juegos = state.allVideogames.filter((game)=> {
                 return game.generos.find((g)=> {
                    return action.payload === g
                    })
                })
            console.log(juegos) //OK, TRAE TODOS LOS JUEGOS FILTRADOS
            //console.log(action.payload)   es el genero
            return {
                ...state,
                videogames: juegos
            };
        case 'FILTER_CREATED':
            const allVideogames2 = state.allVideogames
            const createdFilter = action.payload === 'DB' ? 
                                    allVideogames2.filter(e => (typeof e.id) === 'string') 
                                    : allVideogames2.filter(e => !((typeof e.id) === 'string')) 
            return{
                ...state,
                videogames: action.payload === 'ALL' ? state.allVideogames : createdFilter
            };
        case 'ORDER_NAME':
        console.log(state.videogames)    
        let sortedArr = action.payload === "A-Z" ?
            //sort para comparar 2 valores de la function
                state.videogames.sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1 };
                    if(b.name.toLowerCase() > a.name.toLowerCase()) { return -1 };
                    return 0;
                }) :
                state.videogames.sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) { return -1 };
                    if(b.name.toLowerCase() > a.name.toLowerCase()) { return 1 };
                    return 0;
                });
            return {
                ...state,
                videogames: sortedArr
            };
        case 'ORDER_RATING':
            let ratingArr = action.payload === "asc" ?
            //sort para comparar 2 valores de la function
                state.videogames.sort(function(a, b) {
                    if(a.rating > b.rating) { return 1 };
                    if(b.rating > a.rating) { return -1 };
                    return 0;
                }) :
                state.videogames.sort(function(a, b) {
                    if(a.rating > b.rating) { return -1 };
                    if(b.rating > a.rating) { return 1 };
                    return 0;
                });
            return {
                ...state,
                videogames: ratingArr
            };    

        default:
            return state;
    }
};

export default rootReducer; 


/*
filtro si es string 
let allGames = state.allGames;
      let gamesFiltered =
        allGames && allGames.filter((g) => g.genres.includes(action.payload));
      return {
        ...state,
        games: gamesFiltered,
      };
*/