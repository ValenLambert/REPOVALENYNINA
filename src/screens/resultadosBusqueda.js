import React, { Component } from "react";
import Pelicula from "../components/Pelicula/Pelicula"; // Usamos el componente Pelicula
const apiKey = '42737f60c529bfe7e9586db8cb132a1c';

class ResultadosBusqueda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultados: []
        }
    }

    componentDidMount(){
        const idBusqueda = this.props.match.params.busqueda
        fetch(`https://api.themoviedb.org/3/search/movie?query=${idBusqueda}&api_key=${apiKey}`)
        .then(response => response.json())
            .then(data => {
                this.setState({
                    resultados: data.results,
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
// llamo a history, y accedo a la propiedad .location.state.busqueda 
// history llega por props, y hay que pasarsela 
// en el push le puedo pasar dos parametros 
// 

    render () {
        const {resultados} = this.state
        return (
            <div> 
           <>
            <br></br> 
            <div className="Tarjeta">
                    {resultados.length > 0 ? (
                        resultados.map((elem) => (
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
                        <p>No se ha encontrado ninguna pelicula </p>
                    )}
                </div>
            </>
             </div>
        )
    }

}

export default ResultadosBusqueda;