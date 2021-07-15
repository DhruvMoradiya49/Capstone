import React from 'react';
import "./Home.css";
import Header from './Header';
import Product from "./Product";
import {message} from 'antd'
import Axios from 'axios';
import constants from './constants';

class Home extends React.Component {
    state={
        productData:[],
        searchText:'',
        addedProductToCart:[]
    }
    componentDidMount(){
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                this.setState({productData:json})
            })
    }
    addtoCart=(product)=>{
        let addedProductToCart=this.state.addedProductToCart
        addedProductToCart.push(product)
        window.localStorage.setItem('productInCart',JSON.stringify(addedProductToCart))
        this.setState({addedProductToCart})
        message.success('Your selected item is successfully added in cart!');
        Axios.post(constants.url.carts,{
            user:JSON.parse(window.localStorage.getItem('user')).id
        })
    }
    // addProduct=()=>{
    //     let product_data=[]
    //     product_data.push({
    //         id:this.state.id,
    //         title:this.state.title,
    //         image:this.state.image,
    //         price:this.state.price
    //     })
    // }
    render(){
        return (
            <React.Fragment>
                <Header {...this.props} searchText={this.state.searchText} setSearchText={(data)=>this.setState({searchText:data})} cartCount={this.state.addedProductToCart.length} />
                <div className="home">
                    <div className="home_container">
                        <img className="home_image" src="Images/header.png" alt="header_image" />
                        <div className="home_row">
                            {this.state.productData.filter(d=>d.title.toLowerCase().includes(this.state.searchText.toLowerCase())).map((product,index)=>(
                                    <Product product={product} id={product.id} title={product.title} price={product.price} key={index}
                                        image={product.image} addtoCart={(data)=>this.addtoCart(data)}
                                    />
                            ))}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
