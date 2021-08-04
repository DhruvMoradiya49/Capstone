import React from 'react';
import Subtotal from './Subtotal';
import "./Checkout.css";
import Header from './Header';
import {message} from 'antd';
import Axios from 'axios';
import constants from './constants';
import Footer from './Footer';

class Checkout extends React.Component {
    state={
        cartItem:[],
        totalAmount:0
    }
    componentDidMount(){
        // if(cartItemId){
            
        //     fetch('https://fakestoreapi.com/products')
        //     .then(res=>res.json())
        //     .then(json=>{
        //         let cartItem=json.filter((d)=>cartItemId.includes(d.id))
                
        //     })
        // }
        this.getCartData()
    }
    getCartData=()=>{
        if(window.localStorage.getItem('user')) {
            Axios.get(`${constants.url.cart_items}?user_eq=${JSON.parse(window.localStorage.getItem('user')).id}`, 
            {headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            if(response.data){
                let totalAmount=0
                this.setState({cartItem:response.data})
                for(const item of response.data){
                    const total = Number(item.products.price)
                    totalAmount = totalAmount + total
                }
                this.setState({ totalAmount })
            }
        })
        }
        
    }
    clearCart=()=>{
        for(const data of this.state.cartItem){
            Axios.delete(constants.url.cart_items+"/"+data.id,
            {headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}})
            .then((res)=>{
                message.success('Your cart is successfully cleared!');
                this.getCartData()
            })
        }
    }
    removeItem=(id,name)=>{
        Axios.delete(constants.url.cart_items+"/"+id,
        {headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}})
        .then((res)=>{
            message.success(`${name} is removed from your Cart!`);
            this.getCartData()
        })
        // let cartItem=this.state.cartItem.filter((d)=>d.id!=id)
        // this.setState({cartItem})
        // let totalAmount=0
        // for(const item of cartItem){
        //     const total = Number(item.price)
        //     totalAmount = totalAmount + total
        // }
        // this.setState({ totalAmount })
        // window.localStorage.setItem('productInCart',JSON.stringify(cartItem))
    }
    render(){
        return (
            <React.Fragment>
                <Header {...this.props} cartCount={this.state.cartItem.length} />
                <div className="checkout">
                    <div className="checkout_left">
                        <img className="checkout_ad" 
                            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="banner" 
                        />
                        <div style={{display:'flex',justifyContent:'space-between', alignItems:'center',borderBottom: '1px solid lightgray',marginRight:'20px'}}>
                            <h2 className="checkout_title">Your shopping Cart</h2>
                            {/* <div style={{marginRight:'30px',cursor:'pointer',color:'red'}} onClick={()=>this.clearCart()}>Clear Cart</div> */}
                        </div>
                        {this.state.cartItem.length > 0 ? (
                            <>
                            {this.state.cartItem.map((data,index)=>(
                            <div className = 'checkoutProduct' key={index}>
                                <img className="checkoutProduct_image" src={data.products.image} />
                                <div className="checkoutProduct_info">
                                    <p className="checkoutProduct_title">{data.products.title}</p>
                                    <p className="checkoutProduct_price">
                                        <small>$</small>
                                        <strong>{data.products.price}</strong>
                                    </p>
                                    <button style={{cursor:'pointer'}} onClick={()=>this.removeItem(data.id,data.products.title)}>Remove from Cart</button>
                                </div>
                            </div>
                        ))}
                            </>
                        ) : (
                            <div>
                                <button className="login_signInButton" onClick={() => this.props.history.push('/login')}>Sign In</button>
                            </div>
                        )}
                        
                    </div>
                    <div className="checkout_right">
                        <Subtotal cartCount={this.state.cartItem.length} totalAmount={this.state.totalAmount.toFixed(2)} />
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default Checkout;
