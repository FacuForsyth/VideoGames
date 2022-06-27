import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterCreated, orderName } from "../actions";
import { Link } from "react-router-dom";
import Videogame from "./Videogame";
import Paginado from "./Paginado";

export default function Videogames() {
  //ir despachando las acciones
  const dispatch = useDispatch();
  //traer todo lo que esta en el estado de videogames
  const allVideogames = useSelector((state) => state.videogames);
  const [order, setOrder] = useState('');
  //empieza en la pag
  const [currentPage, setCurrentPage] = useState(1);
  //cuantos juegos por pagina
  const [videogamesPage] = useState(15);
  //indice para el ultimo juego
  const indexOfLastVideogame = currentPage * videogamesPage; //15
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPage; //0
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //component did mounth
  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);
  //para el boton de resetear los videojuegos
  function handleClick(e) {
    e.preventDefault(); //para que no se rompa por las dudas
    dispatch(getVideogames());
  };

  function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))  //value es el payload
  };

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderName(e.target.value))
    setCurrentPage(1);  //setea para que empieze en la pagina 1
    setOrder(`Orden ${e.target.value}`)     //estado local para que lo setee
  }

  return (
    <div>
      <Link to="/videogame">Crear VideoJuego</Link>
      <h1>JUEGOSTECA</h1>
      <button onClick={(e) => {
          handleClick(e);
        }}>Volver a cargar videojuegos
      </button>

      <div>
        <select onChange={e => handleFilterCreated(e)}>
          <option value="ALL">TODOS LOS JUEGOS</option>
          <option value="API">JUEGOS POR API</option>
          <option value="DB">JUEGOS CREADOS</option>
        </select>
        <select onChange={e => handleSort(e)}>
          <option value="A-Z">A - Z</option>
          <option value="Z-A">Z - A</option>
        </select>
        <select>
          <option value="asc">Mayor a Menor</option>
          <option value="desc">Menor a Mayor</option>
        </select>
        
        <Paginado
          videogamesPage={videogamesPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />

        {currentVideogames?.map((e) => {
          return (
            <div>
              <Link to={"/videogames/" + e.id}>
                <Videogame
                  image={e.image}
                  name={e.name}
                  generos={e.generos}
                  key={e.id}
               />
              </Link>
            </div>
          );
         })
        }
      </div>
    </div>
  );
};
