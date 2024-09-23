import React, { Component } from "react";
import Pelicula from "../components/Pelicula/Pelicula"; // Usamos el componente Pelicula
const apiKey = '42737f60c529bfe7e9586db8cb132a1c';

class DetallePelicula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelicula: '',
            cargando: true,
        };
    }

    componentDidMount() {
        const idCapturado = this.props.match.params.id;
        fetch(`https://api.themoviedb.org/3/movie/${idCapturado}?language=en-US&api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    pelicula: data,
                    cargando: false,
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    render() {
        const { pelicula, cargando } = this.state;

        if (cargando) {
            return (
                <div className="loading-container">
                    <h1>Cargando...</h1>
                    <img src="/img/loader.gif" alt="Cargando..." />
                </div>
            );
        }

        if (!pelicula) {
            return <h1>No se encontró la película</h1>;
        }

        return (

            <>
                <br></br>
                <div className="pelicula">
                    <h1 className="nombrePelicula"> {pelicula.title}</h1>
                    <Pelicula
                        id={pelicula.id}
                        img={pelicula.poster_path}
                        sinopsis={pelicula.overview}
                        mostrarDetalle={false}
                        mostrarGeneros={true}
                        genres={pelicula.genres}
                        fecha={pelicula.release_date}
                        duracion={pelicula.runtime}
                        calificacion={pelicula.vote_average}
                        mostrarDescripcion={false}
                        esDetalle={true}
                        agregada={true}
                    />
                    <br></br> <br></br>
                </div>
            </>
        );
    }
}

export default DetallePelicula;
