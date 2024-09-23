import {Component} from "react";
import "./Form.css";


class Busqueda extends Component{
    constructor(props) {
        super(props);
        this.state = {
            busqueda: "",

        };}

        cambioEnInput (elem){
            this.setState({
                busqueda: elem.target.value
            })
        }

        evitarSubmit (elem){
            elem.preventDefault()
            this.props.history.push("/resultados", {busqueda: this.state.busqueda})
        }


        render (){
            return (
                <form onSubmit={(elem)=>this.evitarSubmit(elem)}>
                    <input value={this.state.busqueda} onChange={(elem) => this.cambioEnInput(elem)}
                    placeholder="Busca tu película..."
                    />
                    <button className="Botonete1">Enviar</button>
                </form>
            )
        }
}

export default Busqueda