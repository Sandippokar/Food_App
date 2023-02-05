import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Rating from '@mui/material/Rating';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://apimocha.com/ecatering-ui-test/outlets"
      );
      if(res.data){
        setRestaurants(res.data.result);
        setVendors(res.data.result.vendors);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const showMenu = () => {
    window.location.href = "/menu"
  }

  return (
    <div>
      <h2 style={{textAlign:"center"}}>All Hotel List</h2>
      <Grid item xs={12}>
        <Grid container spacing={2} justifyContent="center">
          {loading ? (
            <h3>Loading...</h3>
          ) : (
          vendors &&
            vendors.map((data : any, i) => {
              return (
                <Grid key={i} item xs={3} className={style.hotelInfo} onClick={()=>showMenu()}>
                  <h4>{data.name}</h4>
                  <div>
                  <Rating name="half-rating" defaultValue={data.ratingValue} precision={0.5} readOnly />({data.ratingCount})
                  </div>
                </Grid>
              );
            })
            )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
