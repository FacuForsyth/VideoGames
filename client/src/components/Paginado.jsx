import React, { useState } from "react";
import '../css/paginado.css';

export default function Paginado({videogamesPage, allVideogames, paginado, setCurrentPage, currentPage}) {
    //console.log('vgpage:', videogamesPage) //cantidad de juegos por pagina
    //console.log('allvg:', allVideogames)    //cantidad de juegos en total
    //console.log('pag:', paginado) //es una funcion pageNumber => {setCurrentPage(pageNumber)}
    //console.log('curr:', currentPage) //llega como undefined
    //console.log('setcc:', setCurrentPage)


    const pageNumbers = [];
    //console.log(pageNumbers) //cantidad de paginas

    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPage); i++) {
        //console.log("i", i) // i 1 , i 2 , cantidad de paginas
        pageNumbers.push(i) 
    };

    const [input, setInput] = useState(1);
    console.log(input)
    function nextPage() {
        setInput(input + 1);
        paginado(input);
        console.log('next', input)  
    };
    function prevPage() {
        setInput(input - 1);
        paginado(input);  
    };
   
    return(
        <div className="pag-div">
            <ul>
                { pageNumbers && 
                pageNumbers.map(number => (
                    <li key={number}>
                    <button className="pag-btn" onClick={() => paginado(number)}>{number}</button>
                    </li>
                ))}

    <div class="paginacion">
		<button onClick={nextPage}>Siguiente</button>
        <button onClick={prevPage}>Anterior</button>
	</div>
            </ul>
        </div>
    )
}