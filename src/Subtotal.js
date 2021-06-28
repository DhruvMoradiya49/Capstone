import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
// import { useStateValue } from './StateProvider';
// import { SportsBasketball } from '@material-ui/icons';

class Subtotal extends React.Component {
    render() {
        return (
            <div className="subtotal">
                <CurrencyFormat
                    renderText={(value) => (
                        <>
                            <p>
                                Subtotal ({this.props.cartCount} items):
                                <strong> ${this.props.totalAmount}</strong>
                            </p>
                            <small className="subtotal_gift">
                                <input type = "checkbox" /> This order contains a gift
                            </small>
                        </>
                    )} 
                    decimalScale={2}
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                />

                <button>Proceed to Checkout</button>
            </div>
        );
    }
}

export default Subtotal;
