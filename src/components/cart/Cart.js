import React, { useState } from "react";
import axios from "axios";
import style from "./Cart.module.css";
import { emptyCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import FoodItem from "../foodItem/FoodItem";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const order = async () => {
    localStorage.setItem("cart_data", JSON.stringify(cart));
    const res = await axios.post(
      "https://apimocha.com/ecatering-ui-test/order"
    );
    if (res.data) {
      // debugger
      setOrderSuccess(true);
      setTimeout(() => {
        dispatch(emptyCart(true));
      }, [2000]);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Cart List</h2>
      {cart && cart.length > 0 ? (
        <>
          {cart.map((item) => {
            return <FoodItem item={item} from="cart" />;
          })}
          <button onClick={() => order()} className={style.button}>
            Place Order
          </button>
          {orderSuccess && (
            <h3 style={{ textAlign: "center" }}>
              Your Order successfully placed.
            </h3>
          )}
        </>
      ) : (
        <h2 style={{ textAlign: "center" }}>Your Cart is empty!!</h2>
      )}
    </div>
  );
};

export default Cart;
