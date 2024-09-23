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
            busqueda: '',
            cargando: true,
            valor: 2
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
                    peliculas: data.results,
                    cargando: false
                });
            })
            .catch((e) => console.log(e));
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

    masPelis() {
        fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${this.state.valor}&api_key=${apiKey}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    peliculas: this.state.peliculas.concat(data.results),
                    valor: this.state.valor + 1
                })
            })
            .catch((error) => console.log(error))
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
        const cargando = this.state.cargando
        return (
            <React.Fragment>
                {cargando ? (
                    <div className="loading-container">
                        <h1>Cargando ...</h1>
                        <img src="/img/loader.gif" alt="Cargando..." />
                    </div>
                )
                    :
                    (
                        <>
                            <h1 className="Subtitulos">Peliculas populares:</h1>
                            <Buscador
                                evitarSubmit={this.evitarSubmit}
                                controlarCambios={this.controlarCambios}
                                buscarPeliculas={this.buscarPeliculas}
                            />


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
                                                mostrarDetalle={true}
                                                mostrarDescripcion={true}

                                            />
                                        ))}
                                    </div>
                                    <button className="Boton1" onClick={() => this.masPelis()}>
                                        Ver más
                                    </button>

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