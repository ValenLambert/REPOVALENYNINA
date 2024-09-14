import React from "react";
import {Route, Switch} from 'react-router-dom'
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Home from "./screens/Home";
import Pelispopu from "./components/Pelispopu/Pelispopu"
import Pelisencartel from "./components/Pelisencartel/Pelisencartel";
import NotFound from './screens/NotFound'

// import PelisFav from "./components/PelisFav/PelisFav" --> lo dejo listo para cuanod este el archivo de PelisFav


function App() {
  return (
    <div>
      {/* lo dejo listo el sistema de ruteo */}
      <Nav />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        {/* <Route path="/favoritos" component={PelisFav} /> */}
        <Route path="/vertodaspopu" component={Pelispopu} />
        <Route path="/vertodascartelera" component={Pelisencartel} />
        <Route path="" component={NotFound}/>
      </Switch>
      <Footer />
    </div>

  );
}

export default App;
