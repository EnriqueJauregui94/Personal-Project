// MyCart.jsx

import React, { useEffect, useState } from 'react';
import '../Styles/MyCart.css';

function MyCart({ cart, cartItemCount }) {
    const [cartItems, setCartItems] = useState([]);

    return (
        <div className="mycart">
            <h1>My Cart</h1>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        <p>{item.title}</p>
                        <p>${item.price}</p>
                        <img src={item.image} alt={item.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyCart;

