import React from 'react';
import Subtotal from './Subtotal';
import "./Checkout.css";
import Header from './Header';
import {message} from 'antd';

class Checkout extends React.Component {
    state={
        cartItem:[],
        totalAmount:0
    }
    componentDidMount(){
        let cartItem=JSON.parse(window.localStorage.getItem('productInCart'))
        // if(cartItemId){
            let totalAmount=0
        //     fetch('https://fakestoreapi.com/products')
        //     .then(res=>res.json())
        //     .then(json=>{
        //         let cartItem=json.filter((d)=>cartItemId.includes(d.id))
                this.setState({cartItem})
                for(const item of cartItem){
                    const total = Number(item.price)
                    totalAmount = totalAmount + total
                }
                this.setState({ totalAmount })
        //     })
        // }
    }
    clearCart=()=>{
        window.localStorage.removeItem('productInCart')
        this.setState({cartItem:[]})
        message.success('Your cart is successfully cleared!');
    }
    removeItem=(id)=>{
        let cartItem=this.state.cartItem.filter((d)=>d.id!=id)
        this.setState({cartItem})
        let totalAmount=0
        for(const item of cartItem){
            const total = Number(item.price)
            totalAmount = totalAmount + total
        }
        this.setState({ totalAmount })
        window.localStorage.setItem('productInCart',JSON.stringify(cartItem))
    }
    render(){
        return (
            <React.Fragment>
                <Header cartCount={this.state.cartItem.length} />
                <div className="checkout">
                    <div className="checkout_left">
                        <img className="checkout_ad" 
                            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="banner" 
                        />
                        <div style={{display:'flex',justifyContent:'space-between', alignItems:'center',borderBottom: '1px solid lightgray',marginRight:'20px'}}>
                            <h2 className="checkout_title">Your shopping Cart</h2>
                            {/* <div style={{marginRight:'30px',cursor:'pointer',color:'red'}} onClick={()=>this.clearCart()}>Clear Cart</div> */}
                        </div>
                        {this.state.cartItem.map((data,index)=>(
                            <div className = 'checkoutProduct' key={index}>
                                <img className="checkoutProduct_image" src={data.image} />
                                <div className="checkoutProduct_info">
                                    <p className="checkoutProduct_title">{data.title}</p>
                                    <p className="checkoutProduct_price">
                                        <small>$</small>
                                        <strong>{data.price}</strong>
                                    </p>
                                    <button style={{cursor:'pointer'}} onClick={()=>this.removeItem(data.id)}>Remove from Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="checkout_right">
                        <Subtotal cartCount={this.state.cartItem.length} totalAmount={this.state.totalAmount.toFixed(2)} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Checkout;
