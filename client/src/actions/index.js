import axios from 'axios';

//conexion con el back
export function getVideogames(){
    return async function(dispatch) {
        var conexion = await axios.get('http://localhost:3001/videogames',{

        });
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: conexion.data
        })
    }
};

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderName(payload){
    return{
        type: 'ORDER_NAME',
        payload
    }
}