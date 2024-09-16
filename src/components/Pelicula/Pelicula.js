import React, { Component } from "react";
import { Link } from "react-router-dom";


class Pelicula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            img: props.img,
            extra: props.extra,
            info: true,
            agregada: true,
        }
        console.log("MIRAAA", props)
    }
    componentDidMount(){
        let storage= localStorage.getItem("peliculasFavs")
        if (storage !== null) {
            let arrayParsiado = JSON.parse(storage)
            let esta = arrayParsiado.includes(this.state.id);
            console.log ("MIRAAAAddd",arrayParsiado)
            if (esta) {
                this.setState({
                    agregada: false
                })
            }
        }
    }

    cambio() {
        if (this.state.info) {
            this.setState({
                info: false
            })
        } else {
            this.setState({
                info: true
            })
        }
    }

    favoritos (id){
        let storage =localStorage.getItem("peliculasFavs")
        if(storage !== null){
            let sotargeParseado =JSON.parse (storage)
            sotargeParseado.push (id)
            let storageStringifiado = JSON.stringify(sotargeParseado)
            localStorage.setItem("peliculasFavs", storageStringifiado)
        } else {
            let arrayfavs = [id]
            let favsStringify = JSON.stringify(arrayfavs)
            localStorage.setItem("peliculasFavs", favsStringify)
        }

        this.setState({
            agregada: false
        })
    }

    sacardeFavs (id){
        let storage = localStorage.getItem("peliculasFavs");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let nuevoArrayFavs = storageParseado.filter(favId => favId !== id);
            let storageStringifiado = JSON.stringify(nuevoArrayFavs);
            localStorage.setItem("peliculasFavs", storageStringifiado);
        }
        this.setState({
            agregada: true
        })
    }


    render() {
        // agrego propiedades para el detalle de la pelicula 
        const { mostrarDetalle, fecha, duracion, calificacion, genres, mostrarGeneros, sinopsis, mostrarDescripcion, esDetalle } = this.props
        
        return (
            <article className={esDetalle ? "pelicula" : "character-card"} >
                <img src={`https://image.tmdb.org/t/p/original${this.state.img}`} alt={this.state.title} className={esDetalle ? "imagenDetalle" : "character-card img"} />
                <h4>{this.state.title}</h4>
                {mostrarDetalle && (

                    <Link to={`detalle/${this.state.id}`}>
                        <button className="Botonete">Ir a detalle</button> <br />
                    </Link>)}

                {mostrarDescripcion && (<button className="Botonete" onClick={() => this.cambio()}>
                    {this.state.info ? 'Ver descripcion' : 'Ver menos'}
                </button>)
                }

                <div className={`${this.state.info ? 'hidden' : 'show'}`}>
                    <p>{this.state.extra}</p>
                </div> 
                {mostrarGeneros && (
                    <div className="genres">
                        <p className="detalles">Géneros:</p>
                        <ul>
                            {genres && genres.length > 0 ? (
                                genres.map(g => (
                                    <li key={g.id}>
                                        <p className="detalles"> {g.name} </p>
                                    </li>
                                ))
                            ) : (
                                <li className="detalles">No hay géneros disponibles</li>
                            )}
                        </ul>
                    </div>
                )}
                {fecha && <p className="detalles">Fecha de lanzamiento: {fecha}</p>}
                {duracion && <p className="detalles">Duración: {duracion} minutos</p>}
                {calificacion && <p className="detalles">Calificación: {calificacion}</p>}
                {sinopsis && <p className="detalles"> Sinopsis: {sinopsis} </p>}
                
                    {this.state.agregada ? 
                    <p className="delete" onClick={() => this.favoritos(this.state.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.58L12 2 8.91 8.66 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    </p>
                        :
                    <p className="delete" onClick={() => this.sacardeFavs(this.state.id)}>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.58L12 2 8.91 8.66 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    </p>
                    }
                    
            </article>)
    }
}

export default Pelicula;