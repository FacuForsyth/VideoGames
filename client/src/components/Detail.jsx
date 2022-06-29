import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions";

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch();
    
    useEffect(()=> {
        dispatch(getDetail(props.match.params.id))  //para acceder al id xq le pase props al componente
    },[dispatch]);

    const juego = useSelector(state => state.detail);

    return(
        <div>
            {juego.length > 0 ?
                <div>
                    <h1>Videogame: {juego[0].name}</h1>
                    <img src={juego[0].image ? juego[0].image : juego[0].img} 
                    alt="" width="500px" height="700px"/>
                    <h2>Rating: {juego[0].rating}</h2>
                    <h2>Relased: {juego[0].relased}</h2>
                    <h3>Generos: {juego[0].generos + ' '}</h3>

                </div> : <p>Loading...</p>
            }
            <Link to='/videogames'> 
                <button>Volver</button>
            </Link>
        </div>
    )
};