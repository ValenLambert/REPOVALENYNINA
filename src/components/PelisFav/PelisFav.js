import React, { Component } from "react";
import Pelicula from "../Pelicula/Pelicula";
const apiKey = '42737f60c529bfe7e9586db8cb132a1c';


class PelisFav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelisBien: [],
        };
    }

    componentDidMount() {
        console.log("mount");
        let storage = localStorage.getItem("peliculasFavs");
        console.log ("ACACACACACACAC:", storage)

        if (storage) {
            let pelisFavs = JSON.parse(storage);
            pelisFavs.map(id =>
                fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}`)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log("acaaaaa:", data)
                    this.setState({
                        pelisBien: this.state.pelisBien.concat(data),
                    });
                    console.log ("ESTAS SON ÑAS FAVS", this.state.pelisBien)
                })
                .catch((e) => console.log(e)))
        } 
    }

    render() {
        const { pelisBien } = this.state;

        return (
            <>
                <h1 className="Subtitulos">Tus favoritas:</h1>
                <div className="Tarjeta">
                    {pelisBien.length > 0 ? (
                        pelisBien.map((elem) => (
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
                    ) : (
                        <p>No tienes películas favoritas aún.</p>
                    )}
                </div>
            </>
        );
    }
}

export default PelisFav;
