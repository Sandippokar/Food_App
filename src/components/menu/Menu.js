import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Menu.module.css";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FoodItem from "../foodItem/FoodItem";
import { ShoppingCart } from "@mui/icons-material";

const Menu = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://apimocha.com/ecatering-ui-test/menu"
      );
      if (res.data) {
        setMenu(res.data.result);
        setCategories(res.data.result.categories);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getTotalQuantity = () => {
    let total = 0;
    cart &&
      cart.forEach((item) => {
        total += item.quantity;
      });
    return total;
  };

  const showCart = () => {
    window.location.href = "/cart";
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Menu List</h2>
      <h2 style={{ textAlign: "center", cursor: "pointer" }} onClick={showCart}>
        <ShoppingCart /> Cart : {getTotalQuantity()}
      </h2>
      <Grid item xs={12} className={style.container}>
        {loading ? (
          <h3 style={{ textAlign: "center" }}>Loading...</h3>
        ) : (
          categories &&
          categories.map((category, i) => {
            return (
              <Accordion className={style.accordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{category.name}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography>
                    {category.items &&
                      category.items.map((item, i) => {
                        return <FoodItem item={item} from="menu" />;
                      })}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })
        )}
      </Grid>
    </div>
  );
};

export default Menu;
