import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { FaWhatsapp } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";
import axios from "../axios";
import { CircularProgress, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FullVacation.module.scss";
import clsx from "clsx";
import { Vacation } from "../components/Vacation";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Share } from "../components/SharePage/Share";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const FullVacation = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.data);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/vacations/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Ошибка при получении афиши");
      });
  }, [id]);

  if (isLoading) {
    return <div>  <CircularProgress /></div>;
  }

  return (
    <Grid container spacing={2}>
      
      <Grid item xs={12}>
        
        {data ? (
          <Vacation
            id={data.id}
            title={data.title}
            text={data.text}
            imageUrls={data.imageUrls}
            createdAt={data.createdAt}
            price={data.price}
            phone={data.phone}
            mail={data.mail}
            isEditable={userData && userData._id === data.user._id}
            isFullPost={true}
          >
            <Grid item xs={12}>
              
              <div className={clsx(styles.about)}>
              <div className={clsx(styles.timing)}>
                  {/* <span>{data.price}</span> */}
                  
                  <span>
                 
                    {new Date(data.createdAt).toLocaleString("ru-RU", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>
                </div>
                
                <h2>Описание</h2>
      
                <ReactMarkdown
                  className={clsx(styles.text)}
                  children={data.text}
                />
                
              </div>
              <Share></Share>
            </Grid>
          </Vacation>
        ) : (
          <div>Loading...</div>
        )}
      </Grid>
    </Grid>
  );
};
