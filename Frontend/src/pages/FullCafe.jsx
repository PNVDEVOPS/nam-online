import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Grid } from "@mui/material";
import { CafeInfo } from "../components/CafeInfo/CafeInfo";
import styles from "./FullCafe.module.scss";
import { useSelector } from "react-redux";

export const FullCafe = () => {
  const [cafeData, setCafeData] = useState(null);
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {
    axios
      .get(`/cafes/${id}`)
      .then((res) => {
        setCafeData(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении данных о кафе или меню кафе");
      });
  }, [id]);

  return (
    <>
      {cafeData && (
        <Grid container spacing={2} className={styles.container}>
          <Grid item xs={12} md={6}>
            <CafeInfo
              id={cafeData._id}
              name={cafeData.name}
              avatar={cafeData.avatar}
              time={cafeData.time}
              cafecategories={cafeData.cafecategories}
              contact={cafeData.contact}
              menu={cafeData.menu}
              isFullPost
              isEditable={userData && userData._id === cafeData.user._id}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};
