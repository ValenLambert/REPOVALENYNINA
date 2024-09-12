import React from "react";
import {Link} from "react-router-dom";


function Navitems(props) {
    return ( 
        <ul>
            <Link className="Barradenav" to={props.data.ruta}>
                <h1>{props.data.Nombre}</h1>
            </Link>
            <p>|</p>
        </ul>
    )
}

export default Navitems;