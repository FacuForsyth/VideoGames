import React from "react";
//importo los hocks que voy a usar de react
import { useState, useEffect } from "react";
//importo los hocks de react-redux
import { useDispatch, useSelector } from "react-redux";
//importo las actions que voy a usar en este componente
import { getVideogames, filterCreated, orderName, orderRating, filterGeneros, getGeneros } from "../actions";
import { Link } from "react-router-dom";
//importo los componentes que voy a usar
import Videogame from "./Videogame";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import '../css/videogames.css'
import '../css/cards.css'

export default function Videogames() {
  //ir despachando las acciones y cambiar un estado en el store de redux
  const dispatch = useDispatch();
  //traer todo lo que esta en el estado de videogames
  const allVideogames = useSelector((state) => state.videogames);
  const generos = useSelector((state) => state.generos);
  const [order, setOrder] = useState('')
  
  //empieza en la pag
  const [pageNumber, setPageNumer] = useState(1);
    //console.log('curr:', pageNumber)

  //cuantos juegos por pagina
  const [videogamesPage] = useState(15);
  //indice para el ultimo juego
  const ultimoVideogame = pageNumber * videogamesPage; //15
  const primerVideogame = ultimoVideogame - videogamesPage; //0
  const currentVideogames = allVideogames.slice(
    primerVideogame,
    ultimoVideogame
  );

  const paginado = (num) => {
    setPageNumer(num);
  };

  //component did mounth
  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGeneros());
  }, [dispatch]);   //captura el estado actual -> cuando se hace un cambio

  function handleFilterCreated(e){
    setPageNumer(1);
    dispatch(filterCreated(e.target.value))  //value es el payload

  };

  function handleSort(e) {
    e.preventDefault();  //para que no se rompa por las dudas, cancela el evento si es cancelable sin detener lo otro
    dispatch(orderName(e.target.value))
    setPageNumer(1);  //setea para que empieze en la pagina 1
    setOrder(`Orden ${e.target.value}`)     //estado local para que lo setee
  }

  function handleRating(e) {
    e.preventDefault();
    dispatch(orderRating(e.target.value))
    setPageNumer(1);  //setea para que empieze en la pagina 1
    setOrder(`OrdenR ${e.target.value}`)     //estado local para que lo setee
  };

   function handleFilterGenero(e){
    e.preventDefault();
    setPageNumer(1);
    dispatch(filterGeneros(e.target.value))
  };

  return (
    <div className="home">
      <div className="head">
        <Link to="/videogame">Crea tu Juego!</Link>
        <h1 className="titulo-pag">API DE VIDEOJUEGOS</h1>
        <br/>
        <br/>
        <br/>
        <br/>
        <h3 className="descripcion-pag">Bienvenidos a la web</h3>
        <h3 className="descripcion-pag">con la ultima informacion sobre juegos</h3>
      </div>

      <div className="filtros">
      <select onChange={e=> handleFilterGenero(e)}>
                    {generos.map((o) => {
                        return <option value={o.name} key={o.id}>{o.name}</option>
                    })}
        </select>
        <select onChange={e => handleFilterCreated(e)}>
          <option value="ALL">TODOS LOS JUEGOS</option>
          <option value="API">JUEGOS POR API</option>
          <option value="DB">JUEGOS CREADOS</option>
        </select>
        <select onChange={e => handleSort(e)}>
          <option value="A-Z">A - Z</option>
          <option value="Z-A">Z - A</option>
        </select>
        <select onChange={e => handleRating(e)}>
          <option value="asc">Mayor a Menor</option>
          <option value="desc">Menor a Mayor</option>
        </select>

        <Paginado
          videogamesPage={videogamesPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
          pageNumber={pageNumber}
        />

        <SearchBar/>
      </div>

        <div className="cards">
        {currentVideogames?.map((e) => {
          return ( 
            
            <Videogame
            id={e.id}
            name={e.name}
            image={e.image}
            rating={e.rating}
            relased={e.relased}
            generos={e.generos.join(', ')}
            ></Videogame>
            
            );
          })
        }
        </div>
      </div>
  );
};