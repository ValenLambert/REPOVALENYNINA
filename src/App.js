import React from "react";
import { Route, Switch } from 'react-router-dom'
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Home from "./screens/Home";
import Pelispopu from "./components/Pelispopu/Pelispopu"
import Pelisencartel from "./components/Pelisencartel/Pelisencartel";
import DetallePelicula from "./screens/DetallePelicula"
import NotFound from './screens/NotFound'
import PelisFav from "./components/PelisFav/PelisFav";
import ResultadosBusqueda from "./screens/resultadosBusqueda";


function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/favoritos" component={PelisFav} />
        <Route path="/vertodaspopu" component={Pelispopu} />
        <Route path="/vertodascartelera" component={Pelisencartel} />
        <Route path='/detalle/:id' component={DetallePelicula} />
        <Route path="/resultados/:busqueda" component={ResultadosBusqueda} />

        <Route path="" component={NotFound} />
      </Switch>
      <Footer />
    </div>

  );
}

export default App;
