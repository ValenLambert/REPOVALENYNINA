import React, { Component } from 'react';
import './stylesheet.css'
class Buscador extends Component {

// SE LLAMA "Buscador" PERO SU FUNCION ES FILTRAR! 
// aca pude haber puesto los metodos para el filtro de la pelicula, 
//pero los hice en los mismos archivos de pelispopu y de pelisencartel


    render() {
        return (
            <>
                <form onSubmit={(event) => this.props.evitarSubmit(event)}>
                    <input type="text" placeholder='Filtrar película ...' onChange={(event) => this.props.controlarCambios(event)} value={this.props.busqueda} class="botonBuscar" />
                </form>
            </>
        )
    }
}

export default Buscador;