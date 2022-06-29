import React from "react";
import '../css/paginado.css';

export default function Paginado({videogamesPage, allVideogames, paginado}) {
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPage); i++) {
        pageNumbers.push(i) // +1 para que no aparezca en el paginado el 0
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
            </ul>
        </div>
    )
}