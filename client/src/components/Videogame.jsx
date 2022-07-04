import React from "react";

export default function Videogame({image, name, generos}) {
    return (
        <div>
            <img src={image} alt='img no found' width='200px' height='200px' />
            <h3>{name}</h3>
            <h5>{generos}</h5>
        </div>
    );
};


/* 
- [ ] Área donde se verá el listado de videojuegos. Deberá mostrar su:
  - Imagen
  - Nombre
  - Géneros
*/