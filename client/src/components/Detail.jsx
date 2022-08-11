import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails, Detail2 } from "../actions";

export default function Detail(props){
    //console.log(props)
    const dispatch = useDispatch();
    const {id} = props.match.params


    useEffect(()=> {
        dispatch(getDetails(id))  //para acceder al id xq le pase props al componente
        return ()=> dispatch(Detail2());
    },[dispatch]);

    

    const juego = useSelector(state => state.details);
    //console.log('esto es juego:', juego)
    //console.log('generos', juego.generos ? juego.generos.map(g => g.name).join(', ') : 'esperar' )

    return(
        <div>
            { juego ? 
                <div>
                    <h1>Nombre del juego: {juego.name}</h1>
                    <img src={juego.image ? juego.image : juego.img} 
                    alt="" width="300px" height="300px"/>
                    <h2>Rating: {juego.rating}</h2>
                    <h2>Relased: {juego.relased}</h2>
                    <h3>Description: 
                        <div dangerouslySetInnerHTML={{__html: juego.descripcion}}/> 
                    </h3>
                    <h3>Generos: {juego.generos ? juego.generos.map(g => g.name).join(', ') : 'cargando generos de DB...' }</h3>
                    <h3>Platforms: {juego.platforms}</h3>
                </div> : <p>Loading...</p>
            }
            <Link to='/videogames'> 
                <h3>Volver</h3>
            </Link>
        </div>
    )
};