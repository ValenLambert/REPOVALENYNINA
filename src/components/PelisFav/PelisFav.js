// deberia luego agregar el loader en esta pagina tambien 
import React, { Component } from "react";

class PelisFav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            holoa: true
        }
    }

    componentDidMount() {
        console.log("mount")
    }

    componentDidUpdate() {
        console.log("update")
    }

    componentWillUnmount() {
        console.log("unmount")
    }



    render() {
        return(
            <>
                <h1>Tus favoritas:</h1>
                
            </>
    )}
}

export default PelisFav