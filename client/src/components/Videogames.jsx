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

export default function Videogames() {
  //ir despachando las acciones
  const dispatch = useDispatch();
  //traer todo lo que esta en el estado de videogames
  const allVideogames = useSelector((state) => state.videogames);
  const generos = useSelector((state) => state.generos);
  const [order, setOrder] = useState('')
  //empieza en la pag
  const [currentPage, setCurrentPage] = useState(1);
      //console.log('curr:', currentPage)
    //console.log('setcc:', setCurrentPage)

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
    dispatch(getGeneros());
  }, [dispatch]);
  //para el boton de resetear los videojuegos
  function handleClick(e) {
    e.preventDefault(); //para que no se rompa por las dudas
    setCurrentPage(1);
    dispatch(getVideogames());
  };

  function handleFilterCreated(e){
    setCurrentPage(1);
    dispatch(filterCreated(e.target.value))  //value es el payload

  };

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderName(e.target.value))
    setCurrentPage(1);  //setea para que empieze en la pagina 1
    setOrder(`Orden ${e.target.value}`)     //estado local para que lo setee
  }

  function handleRating(e) {
    e.preventDefault();
    dispatch(orderRating(e.target.value))
    setCurrentPage(1);  //setea para que empieze en la pagina 1
    setOrder(`OrdenR ${e.target.value}`)     //estado local para que lo setee
  };

   function handleFilterGenero(e){
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterGeneros(e.target.value))
  };

  return (
    <div>
      <Link to="/videogame">Crea tu Juego!</Link>
      <h1>JUEGOSTECA</h1>
      <button onClick={e => handleClick(e)}>Volver a cargar videojuegos</button>

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
        />

        <SearchBar/>
      </div>

      <div className="games-div">
        {currentVideogames?.map((e) => {
          return (
              <Link to={"/videogames/" + e.id}>
                <Videogame
                  name={e.name}
                  image={e.image}
                  rating={e.rating}
                  relased={e.relased}
                  generos={e.generos.join(', ')}
                  key={e.id}
               ></Videogame>
              </Link>
            
          );
         })
        }
      </div>
    </div>
  );
};

//PARA PONER UNA IMAGEN POR DEFAULT
//e.image ? e.image : <img src="https://img.freepik.com/vector-gratis/controles-videojuegos-estilo-neon-pared-ladrillo_24908-58916.jpg"}