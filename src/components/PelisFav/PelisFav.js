import React, { Component } from "react";
import Pelicula from "../Pelicula/Pelicula";
const apiKey = '42737f60c529bfe7e9586db8cb132a1c';


class PelisFav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelisBien: [],
            cargando: true
        };
    }

    componentDidMount() {
        console.log("mount");
        let storage = localStorage.getItem("peliculasFavs");
        console.log("ACACACACACACAC:", storage)

        if (storage) {
            let pelisFavs = JSON.parse(storage);
            // le agrgeo el tiempo para que si no hay peliclas en afvrotitos, aparezca por un tiempito el cargando
            if (pelisFavs.length === 0) {
                setTimeout(() => {
                    this.setState({ cargando: false });
                }, 1000);
            }
            else {
                pelisFavs.map(id =>
                    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}`)
                        .then((resp) => resp.json())
                        .then((data) => {
                            console.log("acaaaaa:", data)
                            this.setState({
                                pelisBien: this.state.pelisBien.concat(data),
                                cargando: false,
                            });
                            console.log("ESTAS SON ÑAS FAVS", this.state.pelisBien)
                        })
                        .catch((e) => console.log(e)))
            }
        }
    }

    render() {
        const { pelisBien, cargando } = this.state;

        if (cargando) {
            return (
                <div className="loading-container">
                    <h1>Cargando...</h1>
                    <img src="/img/loader.gif" alt="Cargando..." />
                </div>);

        }
        if (pelisBien.length === 0) {
            return <h1>No hay peliculas en favoritos </h1>;
        }

        return (
            <>
                <h1 className="Subtitulos">Tus favoritas:</h1>
                <div className="Tarjeta contenedor-favoritos">
                    {pelisBien.map((elem) => (
                        <Pelicula
                            key={elem.id}
                            img={elem.poster_path}
                            title={elem.title}
                            id={elem.id}
                            extra={elem.overview}
                            mostrarDetalle={true}
                            mostrarDescripcion={true}
                        />
                    ))
                    }
                </div>
            </>
        );
    }
}

export default PelisFav;
