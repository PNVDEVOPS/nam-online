import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { fetchBuses } from "../redux/slices/buses";
import { Bus } from "../components/Bus";
import styles from "./AllBusesPage.module.scss";
import { CircularProgress } from "@mui/material";

export const AllBusesPage = () => {
  const dispatch = useDispatch();
  const { items: buses, status } = useSelector((state) => state.buses); // Изменяем имя items на buses для удобства

  useEffect(() => {
    dispatch(fetchBuses());
  }, [dispatch]);

  if (status === "loading") { // Проверяем состояние загрузки
    return <div><CircularProgress></CircularProgress></div>; // Отображаем индикатор загрузки
  }

  return (
    <Grid container spacing={4} className={styles.root}>
      {buses.map((obj) => ( // Убираем проверку существования и непустого массива
        <Grid item xs={12} sm={6} md={4} key={obj._id}>
          <Bus
            _id={obj._id}
            title={obj.title}
            imageUrl={obj.imageUrl}
            isEditable={true} // Здесь определите условие, является ли пользователь редактором автобуса
          />
        </Grid>
      ))}
    </Grid>
  );
};
