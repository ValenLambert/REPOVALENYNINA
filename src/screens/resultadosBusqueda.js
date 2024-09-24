import React, { Component } from 'react'
import Pelicula from "../components/Pelicula/Pelicula";
const apiKey = '42737f60c529bfe7e9586db8cb132a1c';

class Resultados extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultados: [],
            cargando: true
        }
    }
    componentDidMount() {
        // revuperamos la info de la prop
        const buscando = this.props.history.location.state.busqueda
        console.log("ACA BUSCANDO", buscando);
        fetch(`https://api.themoviedb.org/3/search/movie?query=${buscando}&language=en-US&api_key=${apiKey}`)
            .then(resp => resp.json())
            .then(data => {
                setTimeout(()=>{
                    this.setState(
                        {
                            resultados: data.results,
                            cargando: false,
                        });
                    }, 800)}    
            )
            .catch((e) => console.log(e));
        console.log("ACA BSUCANDOOOOOOOO", this.state.resultados)
    }

    render() {
        const { resultados, cargando } = this.state
        return (
            cargando ? (
                <div className="loading-container">
                    <div className="loader">
                        <h1 className="Subtitulos loading">Cargando...</h1>
                        <br></br>
                        <img src="/img/loader.gif" alt="Cargando..." />
                    </div>
                </div>)
                :
                resultados.length === 0 ?
                    (<h1 className="Subtitulitos">No se encontró la película </h1>)
                    : (
                        <>
                            <br></br>
                            <h1 className="Subtitulos"> Resultado de búsqueda:  </h1>
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
                                    <p className='Subtitulitos'>No se ha encontrado ninguna película </p>
                                )}
                            </div>
                        </>
                    ))
    }
}

export default Resultados 