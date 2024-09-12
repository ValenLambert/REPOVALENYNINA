import React from "react";
import Form from "../components/Form/Form";
import Populares from "../components/Populares/Populares";
import Cartelera from "../components/Cartelera/Cartelera";

function Home() {
  return (
    <React.Fragment>
      <Form/>
      <Populares/>
      <Cartelera/>
    </React.Fragment>
  );
}

export default Home;