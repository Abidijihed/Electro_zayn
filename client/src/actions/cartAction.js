import axios from "axios"
import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

// add to cart
export const addItemsToCart = (id, quantity = 1) => async (dispatch, getState) => {
    const { data } = await axios.get(`https://www.electrozayn.com/api/get_one_product/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data[0].id,
            name: data[0].product_name,
            price: data[0].Origin_price,
            cuttedPrice: data[0].Promo_price,
            image: data[0].product_image,
            stock: data[0].stockquantity,
            quantity,
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// remove cart item
export const removeItemsFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// empty cart
export const emptyCart = () => async (dispatch, getState) => {

    dispatch({ type: EMPTY_CART });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem('shippingInfo', JSON.stringify(data));
}