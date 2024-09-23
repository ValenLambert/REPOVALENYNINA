import React, { Component } from "react";
import "./Form.css";
const apiKey = '42737f60c529bfe7e9586db8cb132a1c';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valor: "",
            peliculas: [],

        };
    }
    componentDidMount() {
        console.log("mount")
        fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    peliculas: data.results

                });
            })
            .catch((e) => console.log(e));
    }


    evitarSubmit(event) {
        event.preventDefault();
    }

    filtrarPeliculas(nombrePelicula) {
        const peliculasfiltradas = this.state.peliculas.filter(
            (elem) => elem.title.toLowerCase().includes(nombrePelicula.toLowerCase())
        );
        console.log("buscando:", peliculasfiltradas);
    }

    controlarCambios(event) {
        this.setState({ valor: event.target.value });
        this.filtrarPeliculas(event.target.value);
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={(event) => this.evitarSubmit(event)}>
                    <input
                        onChange={(event) => this.controlarCambios(event)}
                        placeholder="Busca tu película..."
                    />
                </form>
            </React.Fragment>
        );
    }
}

export default Form;
