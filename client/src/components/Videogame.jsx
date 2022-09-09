import React from "react";
//import '../css/cards.css';

export default function Videogame({image, name, generos, id}) {
  return (
    // eslint-disable-next-line react/style-prop-object

        <div className="card" style={{ width: '18rem' }}>
          <img src={image} className="card-img-top" alt='img no found' />
          <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{generos}</p>
              <a href={`/videogames/${id}`} className="btn btn-primary">Ver</a>
          </div>
        </div>

  );
};

/* 
- [ ] Área donde se verá el listado de videojuegos. Deberá mostrar su:
  - Imagen
  - Nombre
  - Géneros
*/
