import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
//importar la accion
import { getGeneros, postVideogame } from "../actions";

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Ingresar un nombre';
    } else if(!input.descripcion) {
        errors.descripcion = 'El juego debe contener una descripcion';
    }
    return errors;
}

export default function GameCreate(){
    const dispatch = useDispatch();
    //te redirige a la ruta que le digo
    const history = useHistory();

    const generos = useSelector((state) => state.generos);
    //console.log(generos) //trae [id:1, name: '']

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        descripcion: '', 
        relased: '', 
        rating: 0, 
        platforms: [],
        //image: '',
        generos:[]
        
    });
    //console.log(generos) 

    //a mi estado input le agrego e.target.value
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    };
    console.log(input) /////////////////
    function handleCheck(e){
        if(e.target.checked){   //true o false
            setInput({
                ...input,
                platforms: [...input.platforms + e.target.value]
                //platforms.join(', ')
            })
        }
    };
    function handleSelect(e){
        setInput({
            ...input,
            generos: [...input.generos, e.target.value] //trae lo que ya habia y concatena lo del target.value, es decir guarda en el arreglo generos todo lo que voy seleccionando
        })
    };
    function handleSubmit(e){
        e.preventDefault();
        console.log(input) /////////////////////
        dispatch(postVideogame(input));
        alert('VideoJuego creado con exito');
        setInput({
            name: '',
            descripcion: '', 
            relased: '', 
            rating: 0, 
            platforms: [],
            //image: '',
            generos:[]
        })
        //que pushee y cuando termine que me lleve al home  ES OPCIONAL - SACAR
        history.push('/videogames')
    };
    function handleDelete(e){
        setInput({
            ...input,
            generos: input.generos.filter(g => g !== e) //filtrar por todos los que no sea ese genero que clickie, devuelve el estado nuevo sin el elemento que clickie
        })
    }

    //para rendelizarlas
    useEffect(() => {
        dispatch(getGeneros()) 
    },[dispatch]);

    return(
        <div>
            <Link to='/videogames'><button>Volver a Juegos</button></Link>
            <h1>Crear VideoJuego</h1>
            <form onSubmit={e=> handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type='text' 
                        value={input.name} 
                        name='name' 
                        onChange={e=> handleChange(e)}
                        />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label>Description:</label>
                    <input 
                        type='text' 
                        value={input.descripcion} 
                        name='descripcion' 
                        onChange={e=> handleChange(e)}/>
                    {errors.descripcion && (
                        <p className="error">{errors.descripcion}</p>
                    )}
                </div>
                <div>
                    <label>Relased:</label>
                    <input type='date' value={input.relased} name='relased' onChange={e=> handleChange(e)}/>
                </div>
                <div>
                    <label>Rating:</label>
                    <input type='number' value={input.rating} name='rating' onChange={e=> handleChange(e)}/>
                </div>
                <div>
                    <label>Platforms:</label>
                    <label><input type='checkbox' value='PC' name='PC' onChange={e=> handleCheck(e)}/> PC </label>
                    <label><input type='checkbox' value='Nintendo Switch' name='Nintendo Switch' onChange={e=> handleCheck(e)}/> Nintendo Switch </label>
                    <label><input type='checkbox' value='Xbox Series S/X' name='Xbox Series S/X' onChange={e=> handleCheck(e)}/> Xbox Series S/X </label>
                    <label><input type='checkbox' value='PlayStation 4' name='PlayStation 4' onChange={e=> handleCheck(e)}/> PlayStation 4 </label>
                    <label><input type='checkbox' value='PlayStation 5' name='PlayStation 5' onChange={e=> handleCheck(e)}/> PlayStation 5 </label>
                </div>
                <select onChange={e=> handleSelect(e)}>
                    {generos.map((o) => {
                        return <option value={o.name}>{o.name}</option>
                    })}
                </select>
                <ul><li>{input.generos.map(e => e + ' ,')}</li></ul>
                <button type="submit">Crear VideoJuego!</button>
            </form>
            {input.generos.map(e =>
                <div className="deleteGen">
                    <p>{e}</p>
                    <button className="botonX" onClick={()=> handleDelete(e)}>X</button>
                </div>
            )}
        </div>
    )
};

/* 
                <div>
                    <label>Image:</label>
                    <input type='text' value={input.image} name='image' onChange={e=> handleChange(e)}/>
                </div>
*/