import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div>
            <h1>Bienvenidos a JUEGOSTECA</h1>
            <Link to = '/videogames'>
                <button>Press Start</button>
            </Link> 
        </div>
    )
}