import React, { Component } from "react";
import "./Movie.css";
import { Link } from "react-router-dom";
import Pelicula from "../Pelicula/Pelicula";

const apiKey = '42737f60c529bfe7e9586db8cb132a1c';

class Cartelera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            mostrar: 5,
            cargando: true
        }
    }


    componentDidMount() {
        console.log("mount")
        fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("acaaaaa:", data)
                setTimeout(() => {
                    this.setState({
                        peliculas: data.results,
                        cargando: false
                    });
                }, 800)

            })
            .catch((e) => console.log(e));
    }


    componentDidUpdate() {
        console.log("update")
    }

    componentWillUnmount() {
        console.log("unmount")
    }

    render() {
        const peliculasAMostrar = this.state.peliculas.slice(0, this.state.mostrar);
        const cargando = this.state.cargando
        return (
            <React.Fragment>
                {cargando ?
                    (<div className="loading-container">
                        <div className="loader">
                            <h1 className="Subtitulos loading"> </h1>
                            <br></br>
                            {/* <img src="/img/loader.gif" alt="Cargando..." /> SE LA SACO XQ YA APARECE EL LOADER  POR EL ARCHIVO DE PELISPOPU*/}
                        </div>
                    </div>)
                    :
                    (
                        <>

                            <h1 className="Subtitulos">Películas en cartelera:</h1>

                            <div className="Tarjeta">
                                {peliculasAMostrar.map((elem) => (
                                    <Pelicula
                                        img={elem.poster_path}
                                        title={elem.title}
                                        id={elem.id}
                                        extra={elem.overview}
                                        mostrarDetalle={true}
                                        mostrarDescripcion={true}
                                    />
                                ))}
                            </div>
                            <Link to="/vertodascartelera">
                                <button className="Boton3">Ver todas</button>:
                            </Link>
                        </>
                    )
                }

            </React.Fragment>

        )
    }
}

export default Cartelera