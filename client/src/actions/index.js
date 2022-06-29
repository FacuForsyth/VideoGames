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

export function getNameVideogames(name) {
    return async function(dispatch) {
        try{
            var nameVG = await axios.get(`http://localhost:3001/videogames?name=${name}`);
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
        var res = await axios.get('http://localhost:3001/genres',{

        });
        //console.log(res) trae {data:[id:1, name: '']}
        return dispatch({
            type: 'GET_GENEROS',
            payload: res.data
        })
    }
};

export function postVideogame(payload) {
    return async function(dispatch) {
        const resp = await axios.post(`http://localhost:3001/videogame`, payload);
        console.log(resp)
        return resp;
    }
};

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

export function getDetail(id){
    return async function(dispatch){
        try{
            var info = await axios.get(`http://localhost:3001/videogames/` + id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: info.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}; 