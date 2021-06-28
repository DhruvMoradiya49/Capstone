import React from 'react';
import "./Product.css";
// import { useStateValue } from './StateProvider';

function Product({id, title, image, price,addtoCart,product}) {

    // const [{ basket }, dispatch] = useStateValue();
    // const addToBasket = () => {
    //     // dispatch the item into the data layer
    //     dispatch({
    //         type: 'ADD_TO_BASKET',
    //         item: {
    //             id: id,
    //             title:title,
    //             image:image,
    //             price:price,
    //         },
    //     });
    // };
    return (
        <div className="product">
            <div className="product_info">
                <p>{title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
            </div>
            <img src={image} alt="Book" />
            {/* <button onClick={addToBasket}>Add to Cart</button> */}
            <button style={{cursor:'pointer'}} onClick={()=>addtoCart(product)}>Add to Cart</button>
        </div>
    )
}

export default Product;