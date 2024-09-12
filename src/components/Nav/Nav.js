import React from "react";
import "./styles.css"
import Navitems from "../Navitems/Navitems";
let items = [
    { Nombre: "HOME", ruta: "/" },
    { Nombre: "FAVORITOS", ruta: "/favoritos" },
    { Nombre: "VER  POPULARES", ruta: "/vertodaspopu" },
    { Nombre: "VER  EN CARTELERA ", ruta: "/vertodascartelera" }
];

function Nav() {
    return (
        <nav>
            <ul className="main-nav">
                {items.map((elem) => <Navitems data={elem} />)}
            </ul>
            <ul className="user">
                <li><img src="https://png.pngtree.com/png-vector/20220131/ourmid/pngtree-vn-logo-design-brand-modern-simple-vector-png-image_23589804.png" alt="" /></li>
            </ul>
        </nav>
    )
}

export default Nav;
