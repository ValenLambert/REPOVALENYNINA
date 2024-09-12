import React, { Component } from "react";
import {Link} from "react-router-dom";


class Pelicula extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            img: props.img,
            extra: props.extra,
            info:true,
            agregada: true,
            favoritas: [] //ACA SE GUARDAN LAS PELICULAS FAVPRTITAS PARA LA QUE HAGA FAVORITASS!!
        }
        console.log("MIRAAA", props)
    }
    
    cambio () {
        if(this.state.info){
            this.setState ({
                info: false
            })
        } else {
            this.setState ({
                info: true
            })
        }
    }

    favoritos = () => {
        const { agregada, id, title, img, extra } = this.state;

        if (agregada) {
            this.setState(prevState => ({
                agregada: false,
                favoritas: [
                    ...prevState.favoritas, 
                    { id, title, img, extra }
                ]
            }));
        } else {
            this.setState(prevState => ({
                agregada: true,
                favoritas: prevState.favoritas.filter(pelicula => pelicula.id !== id)
            }));
        }
    }
    
    

    render () {
        return (
                <article className='character-card'>
                    <img src={`https://image.tmdb.org/t/p/original${this.state.img}`} alt={this.state.title} />
                    <h4>{this.state.title}</h4>
                    <Link to={`detalle/${this.state.id}`}>
                        <button className="Botonete">Ir a detalle</button> <br />
                    </Link>
                    <button className="Botonete" onClick={() => this.cambio()}>
                        {this.state.info ? 'Ver descripcion' : 'Ver menos'}
                    </button>
                    <div className={`${this.state.info ? 'hidden' : 'show'}`}>
                        <p>{this.state.extra}</p>
                    </div> <br></br>
                    <br></br>
                    <p className="delete" onClick={() => this.favoritos()}>
                        {this.state.agregada ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.58L12 2 8.91 8.66 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        : 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.58L12 2 8.91 8.66 2 9.24l5.46 4.73L5.82 21z"/>
                         </svg>
}</p>                
                </article>)
        }
}

export default Pelicula;