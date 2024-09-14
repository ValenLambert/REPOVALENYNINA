import React, { Component } from "react";
import "./Movie.css";
import Pelicula from "../Pelicula/Pelicula";
import Buscador from '../Buscador/Buscador'
const apiKey = '42737f60c529bfe7e9586db8cb132a1c';

class Pelispopu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            mostrar: 10,
            busqueda: ''
        }
    }

    verMas() {
        this.setState((prevState) => ({
            mostrar: prevState.mostrar + 5
        }));
    }

    verMenos() {
        this.setState((prevState) => ({
            mostrar: prevState.mostrar - 5
        }));
    }




    componentDidMount() {
        console.log("mount")
        fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    peliculas: data.results
                });
            })
            .catch((e) => console.log(e))
    }
    // form de busqueda
    buscarPeliculas = () => {
        fetch(`https://api.themoviedb.org/3/search/movie/popular?query=${this.state.busqueda}&language=en-US&page=1&api_key=${apiKey}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    peliculas: data.results ? data.results : []
                })
            })
    }

    // evitar el envio y que luego se ejecute el metodo de buscar las peliculas 
    evitarSubmit = (event) => {
        event.preventDefault();
        this.buscarPeliculas()
    }
// metidi de controlar cambios 
    controlarCambios = (event) => {
        this.setState({
            busqueda: event.target.value
        })
    }
    
    componentDidUpdate() {
        console.log("update")
    }

    componentWillUnmount() {
        console.log("unmount")
    }



    render() {
        const peliculasAMostrar = this.state.peliculas
            .filter(pelicula => pelicula.title.toLowerCase().includes(this.state.busqueda.toLocaleLowerCase()))
            .slice(0, this.state.mostrar);

            return (
                <React.Fragment>
                    <h1 className="Subtitulos">Peliculas populares:</h1>
                                    <Buscador
                                        evitarSubmit={this.evitarSubmit}
                                        controlarCambios={this.controlarCambios}
                                        buscarPeliculas={this.buscarPeliculas}
                                    />
                    {this.state.peliculas.length === 0 ? (
                        <div className="loading-container">
                        <h1>Cargando ...</h1>
                        <img src="/img/loader.gif" alt="Cargando..." />
                    </div>
                    ) : (
                        <>
                            {peliculasAMostrar.length > 0 ? (
                                <>
                                    <div className="Tarjeta">
                                        {peliculasAMostrar.map((elem) => (
                                            <Pelicula
                                                key={elem.id}
                                                img={elem.poster_path}
                                                title={elem.title}
                                                id={elem.id}
                                                extra={elem.overview}
                                            />
                                        ))}
                                    </div>
                                    {this.state.mostrar < 20 && (
                                        <button className="Boton1" onClick={() => this.verMas()}>
                                            Ver más
                                        </button>
                                    )}
                                    {this.state.mostrar >= 10 && (
                                        <button className="Boton2" onClick={() => this.verMenos()}>
                                            Ver menos
                                        </button>
                                    )}
                                </>
                            ) : (
                                <h1>No se ha encontrado ninguna película popular</h1>
                            )}
                        </>
                    )}
                </React.Fragment>
            );
    }
}

export default Pelispopu