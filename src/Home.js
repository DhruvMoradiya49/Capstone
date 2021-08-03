import React from 'react';
import "./Home.css";
import Header from './Header';
import Product from "./Product";
import {message} from 'antd'
import Axios from 'axios';
import constants from './constants';
import Footer from './Footer';

class Home extends React.Component {
    state={
        productData:[],
        searchText:'',
        addedProductToCart:[],
        cartData:[]
    }
    componentDidMount(){
        this.getProductAndCart()
    }

    getProductAndCart=()=>{
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                this.setState({productData:json})
            })
            if(window.localStorage.getItem('user')) {
                Axios.get(`${constants.url.cart_items}?user_eq=${JSON.parse(window.localStorage.getItem('user')).id}`)
                .then((response)=>{
                    if(response.data){
                        this.setState({cartData:response.data})
                    }
                })
            }
    }
    // addtoCart=(product)=>{
    //     let addedProductToCart=this.state.addedProductToCart
    //     addedProductToCart.push(product)
    //     window.localStorage.setItem('productInCart',JSON.stringify(addedProductToCart))
    //     this.setState({addedProductToCart})
    //     message.success('Your selected item is successfully added in cart!');
    //     Axios.post(constants.url.carts,{
    //         user:JSON.parse(window.localStorage.getItem('user')).id
    //     })
    // }
    addtoCart=(data)=>{
        let product_data={
            id:data.id,
            title:data.title,
            image:data.image,
            price:data.price
        }
        Axios.post(constants.url.cart_items,{
            products:product_data,
            user:JSON.parse(window.localStorage.getItem('user')).id
        }).then((res)=>{
            console.log(res);
            this.getProductAndCart()
            message.success(`${data.title} is added in Cart!`)
        })
    }
    render(){
        return (
            <React.Fragment>
                <Header {...this.props} searchText={this.state.searchText} setSearchText={(data)=>this.setState({searchText:data})} cartCount={this.state.cartData.length} />
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
                <Footer />
            </React.Fragment>
        );
    }
}

export default Home;
