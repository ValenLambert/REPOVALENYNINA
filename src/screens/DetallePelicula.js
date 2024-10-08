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
                setTimeout(() => {
                    this.setState({
                        pelicula: data,
                        cargando: false,
                    });
                }, 800)

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    render() {
        const { pelicula, cargando } = this.state;

        return (
            cargando ? (
                <div className="loading-container">
                    <div className="loader">
                        <h1 className="Subtitulos loading">Cargando...</h1>
                        <br></br>
                        <img src="/img/loader.gif" alt="Cargando..." />
                    </div>
                </div>
            ) : !pelicula ? (
                <h1 className='Subtitulitos'>No se encontró la película</h1>
            ) : (
                <>
                    <br />
                    <div className="pelicula">
                        <h1 className="nombrePelicula">{pelicula.title}</h1>
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
                        <br /><br />
                    </div>
                </>
            )
        );
    }
}


export default DetallePelicula;
