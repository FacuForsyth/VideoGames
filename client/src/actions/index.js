import axios from 'axios';

//conexion con el back
export function getVideogames(){
    return async function(dispatch) {
        var conexion = await axios.get('/videogames',{

        });
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: conexion.data
        })
    }
};

export function getNameVideogames(name) {
    return async function(dispatch) {
        try{
            var nameVG = await axios.get(`/videogames?name=${name}`);
            //console.log('llega', name)    
            return dispatch({
                    type: 'GET_NAME_VIDEOGAMES',
                    payload: nameVG.data
        });
        }
        catch(error){
            console.log(error);
        }
    };
};

export function getGeneros(){
    return async function(dispatch) {
        var res = await axios.get('/genres',{

        });
        //console.log(res) trae {data:[id:1, name: '']}
        return dispatch({
            type: 'GET_GENEROS',
            payload: res.data
        })
    }
};

export function postVideogame(payload) {
    return async function() {
        const resp = await axios.post(`/videogame`, payload);
        //console.log(resp)
        return resp;
    }
};

export function filterGeneros(genero) {
    return function (dispatch) {
        dispatch({
            type: "FILTER_GENERO", 
            payload: genero
        })
        //console.log(genero) //SI TRAE EL GENERO SELECCIONADO
      }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
};

export function orderName(payload){
    return{
        type: 'ORDER_NAME',
        payload
    }
};

export function orderRating(payload){
    return{
        type: 'ORDER_RATING',
        payload
    }
};

export function getDetails(id){
    
    return async function(dispatch){
        try{
            var info = await axios.get(`/videogames/${id}`);
            //console.log('esto es info:', info)
            return dispatch({
                type: 'GET_DETAILS',
                payload: info.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function Detail2(){
    return{
        type: 'DETAIL2'
    }
};