import React, { Component } from 'react'
import firebase from 'firebase'

class HomePage extends Component {

    constructor(props){
        super(props)
        this.state = {
            areProducts: false,
            products: null,
            newProduct: {
                nombre: null,
                cantidad: null,
                precio: null,
                descripcion: null
            }
        }
    }

    componentDidMount = () => {
        firebase.firestore().collection('products_2')
            .onSnapshot((products)=>{
                let array_products = []
                products.forEach(product=>{
                    array_products.push(product.data())
                })
                this.setState({products: array_products, areProducts: true})
            })
    }

    updateNombre = (e) => {
        let { newProduct } = this.state
        newProduct.nombre = e.target.value
        this.setState(newProduct)
    }

    updateDesc = (e) => {
        let { newProduct } = this.state
        newProduct.descripcion = e.target.value
        this.setState(newProduct)
    }

    updateCantidad = (e) => {
        let { newProduct } = this.state
        newProduct.cantidad = e.target.value
        this.setState(newProduct)
    }

    updatePrecio = (e) => {
        let { newProduct } = this.state
        newProduct.precio = e.target.value
        this.setState(newProduct)
    }

    uploadProduct = (e) => {
        e.preventDefault()
        firebase.firestore().collection("products_2").add(this.state.newProduct)
            .then(()=>{
                alert("Producto añadido con éxito")
                let { newProduct } = this.state
                newProduct.nombre = ""
                newProduct.precio = ""
                newProduct.descripcion = ""
                newProduct.cantidad = ""
                this.setState(newProduct)
            })
            .catch((err)=>{
                alert("Ocurrió un error")
                console.log(err)
            })
    }

    render(){
        return(
            <div className="container">
                <div className="products-list">
                    {
                        this.state.areProducts ? 
                            this.state.products.map((product, index)=>(
                                <div key={index}>
                                    <p>Nombre: {product.nombre}</p>
                                    <p>Descripcion: {product.descripcion}</p>
                                    <p>Cantidad: {product.cantidad}</p>
                                    <p>Precio: {product.precio}</p>
                                    <hr />
                                </div>
                            ))
                            : <p>Cargando...</p>
                    }
                </div>
                <div className="products-form">
                    <p>Añade un nuevo producto</p>
                    <input
                        type="text"
                        placeholder="Nombre"
                        onChange={(e)=>this.updateNombre(e)}
                        value={this.state.newProduct.nombre}
                     />
                     <input
                        type="text"
                        placeholder="Descripcion"
                        onChange={(e)=>this.updateDesc(e)}
                        value={this.state.newProduct.descripcion}
                     />
                     <input
                        type="number"
                        placeholder="Cantidad"
                        onChange={(e)=>this.updateCantidad(e)}
                        value={this.state.newProduct.cantidad}
                     />
                     <input
                        type="number"
                        placeholder="Precio"
                        onChange={(e)=>this.updatePrecio(e)}
                        value={this.state.newProduct.precio}
                     />
                     <button onClick={(e)=>this.uploadProduct(e)}>Agregar producto</button>
                </div>
            </div>
        )
    }
}

export default HomePage