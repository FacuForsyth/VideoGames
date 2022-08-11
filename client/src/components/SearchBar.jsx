import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('') //seteo en un array vacio
    //name es lo que esta tipeando el cliente
    console.log(name)

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    };
    //voy guardando lo que tipee el cliente en el estado local name 
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameVideogames(name))  //despacho la accion con el name
        //el name guardado en el estado local, se la paso a la accion, llama al back
    }

    return(
        <div>
            <input type ='text' placeholder="Ingresar nombre..." onChange={e => {handleInputChange(e)}}></input>
            <button type="submit" onClick={e => {handleSubmit(e)}}>Buscar</button>
        </div>
    )
}