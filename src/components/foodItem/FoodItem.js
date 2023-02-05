import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./FoodItem.module.css";
import Grid from "@mui/material/Grid";
import { addToCart, removeToCart } from "../../redux/cartSlice";

const FoodItem = ({ item, from }) => {
  const dispatch = useDispatch();

  let id = item.id;
  let itemName = item.itemName;
  let basePrice = item.basePrice;
  let image = item.image;

  return (
    <Grid xs={12} className={style.itemInfo}>
      <Grid xs={2} className={style.image}>
        <img src={item.image} alt="" />
      </Grid>
      <Grid xs={10} className={style.details}>
        <p className={style.name}>{item.itemName}</p>
        <div>{item.description}</div>

        <div className={style.priceInfo}>
          {item.basePrice && (
            <p className={style.baseprice}>₹ {item.basePrice}</p>
          )}
          {item.sellingPrice && (
            <p className={style.sellprice}>₹ {item.sellingPrice}</p>
          )}
          {item.quantity && (
            <p className={style.baseprice}>Quantity : {item.quantity}</p>
          )}
        </div>
        {from === "menu" && (
          <button
            onClick={() =>
              dispatch(addToCart({ id, itemName, basePrice, image }))
            }
            className={style.button}
            style={{ background: "dodgerblue" }}
          >
            Add to Cart
          </button>
        )}
        {from === "cart" && (
          <button
            onClick={() => dispatch(removeToCart(id))}
            className={style.button}
            style={{ background: "red" }}
          >
            Remove to Cart
          </button>
        )}
      </Grid>
    </Grid>
  );
};

export default FoodItem;
