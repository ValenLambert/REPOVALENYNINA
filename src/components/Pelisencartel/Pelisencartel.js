import React, { Component } from "react";
import "./Movie.css";
import Pelicula from "../Pelicula/Pelicula";
import Buscador from "../Buscador/Buscador";

const apiKey = '42737f60c529bfe7e9586db8cb132a1c';

class Pelisencartel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            busqueda: "",
            cargando: true,
            valor: 2,
            peliculasBackup: []
        }
    }

    verMas() {
        this.setState((prevState) => ({
            pagina: +1
        }));
    }

    verMenos() {
        this.setState((prevState) => ({
            pagina: -1
        }));
    }


    componentDidMount() {
        console.log("mount")
        fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("acaaaaa:", data)
                this.setState({
                    peliculas: data.results,
                    cargando: false,
                    pagina: 1,
                    peliculasBackup: data.results,
                });
            })
            .catch((e) => console.log(e));
    }

    // Form para buscar pelis en cartelera
    buscarPeliculas = () => {
        fetch(`https://api.themoviedb.org/3/search/movie/now_playing?query=${this.state.busqueda}&language=en-US&page=1&api_key=${apiKey}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    peliculas: data.results ? data.results : []
                })
            })
    }
    // evitar el envio y que luego se ejecute el metodo de buscar las peliculas en cartelera 
    evitarSubmit = (event) => {
        event.preventDefault();
        this.buscarPeliculas()
    }

    // hacer el controlar filtro
    filtrarPeliculas = (nombrePelicula) => {
        const peliculasFiltradas = this.state.peliculasBackup.filter((pelicula) => pelicula.title.toLowerCase().includes(nombrePelicula.toLowerCase())
        )
        this.setState({
            peliculas: peliculasFiltradas
        })
    }


    // metodo de "controlar cambios" 
    controlarCambios = (event) => {
        this.setState({
            busqueda: event.target.value
        }, () => this.filtrarPeliculas(this.state.busqueda))
    }

    componentDidUpdate() {
        console.log("update")
    }

    componentWillUnmount() {
        console.log("unmount")
    }

    masPelis() {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${this.state.valor}&api_key=${apiKey}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    peliculas: this.state.peliculas.concat(data.results),
                    valor: this.state.valor + 1,
                    peliculasBackup: this.state.peliculasBackup.concat(data.results),
                })
                console.log("MIRARARARRARARARA:", data)
            })
            .catch((error) => console.log(error))
    }

    render() {
        const {peliculas, cargando} = this.state

        return (
            <React.Fragment>
                {cargando ? (<div className="loading-container">
                    <h1>Cargando ...</h1>
                    <img src="/img/loader.gif" alt="Cargando..." />
                </div>)
                    :
                    (<>
                        <h1 className="Subtitulos">Peliculas en cartelera:</h1>
                        <Buscador
                            evitarSubmit={this.evitarSubmit}
                            controlarCambios={this.controlarCambios}
                            buscarPeliculas={this.buscarPeliculas}
                        />

                        {peliculas.length > 0 ? (
                            <>

                                <div className="Tarjeta">
                                    {peliculas.map((elem) => (
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
                                {
                                    this.state.valor < 450 ?
                                        <button className="Boton1" onClick={() => this.masPelis()}>
                                            Ver más
                                        </button>
                                        : " "
                                }

                            </>
                        ) : (
                            <h1>No se ha encontrado ninguna película en cartelera</h1>
                        )}
                    </>
                    )}
            </React.Fragment>

        )
    }
}

export default Pelisencartel