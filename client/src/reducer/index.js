const initialState = {
    videogames: [],
    allVideogames: [],  
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                 videogames: action.payload,
                 allVideogames: action.payload
            }
        case 'FILTER_CREATED':
            const allVideogames2 = state.allVideogames
            const createdFilter = action.payload === 'DB' ? 
                                    allVideogames2.filter(e => (typeof e.id) === 'string') 
                                    : allVideogames2.filter(e => !((typeof e.id) === 'string')) 
            return{
                ...state,
                videogames: action.payload === 'ALL' ? state.allVideogames : createdFilter
            }
        case 'ORDER_NAME':
            let sortedArr = action.payload === "A-Z" ?
            //sort para comparar 2 valores de la function
                state.videogames.sort(function(a, b) {
                    if(a.name > b.name) { return 1 };
                    if(b.name > a.name) { return -1 };
                    return 0;
                }) :
                state.videogames.sort(function(a, b) {
                    if(a.name > b.name) { return -1 };
                    if(b.name > a.name) { return 1 };
                    return 0;
                });
            return {
                ...state,
                videogames: sortedArr
            }

        default:
            return state;
    }
};

export default rootReducer; 