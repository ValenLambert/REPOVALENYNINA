import React from "react";
import Populares from "../components/Populares/Populares";
import Cartelera from "../components/Cartelera/Cartelera";
import Busqueda from "../components/Busqueda/Busqueda";

function Home(props) {
  return (
    <React.Fragment>
      <Busqueda history={props.history} />
      <Populares />
      <Cartelera />
    </React.Fragment>
  );
}

export default Home;