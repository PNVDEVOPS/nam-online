import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { FaWhatsapp } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";
import axios from "../axios";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { PostSub } from "../components/PostSub";
import { TagsBlock } from "../components/TagsBlock";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Home.module.scss";
import clsx from "clsx";
import { Event } from "../components/Event"; // Изменил импорт
import { fetchEvents, fetchAfTags } from "../redux/slices/events";

import { Share } from "../components/SharePage/Share";

export const FullEvent = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  const { id } = useParams();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { events, aftags } = useSelector((state) => state.events);

  const isEventsLoading = events.status === "loading";
  const isTagsLoading = aftags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchAfTags());
    dispatch(fetchEvents());
  }, [dispatch]);

  React.useEffect(() => {
    axios
      .get(`/events/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении афиши");
      });
  }, [id]);

  if (isLoading) {
    return <Event isLoading={isLoading} isFullPost />; // Изменил на Event
  }

  const formattedDate = new Date(data.date).toLocaleString('ru-RU', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <>
      <Grid className={clsx(styles.FullEventWrapper)} item xs spacing={2}>
        <Event
          id={data.id}
          title={data.title}
          imageUrl={
            data.imageUrl ? `http://87.228.19.239:4444${data.imageUrl}` : ""
          }
          createdAt={data.createdAt}
          viewsCount={data.viewsCount}
          commentsCount={3}
          phone={data.phone}
          secondphone={data.secondphone}
          date={formattedDate} // Используем отформатированную дату
          isEditable={userData && userData._id === data.user._id}
          isFullPost
        >
          <div>
            <span>Контакты: {data.phone} {data.secondphone}</span>
            <div className={clsx(styles.timing)}>
              <span></span>
              <span></span>
            </div>
          </div>
          <div>
            <div>
              <Share></Share>
            </div>
          </div>
        </Event>
      </Grid>
      <div className={clsx(styles.about)}>
        <h2>О событии:</h2>
        <ReactMarkdown className={clsx(styles.text)} children={data.text} />
      </div>

      <div>
      <h2>Дата проведения:</h2>
          {formattedDate} {/* Отображаем отформатированную дату */}
    </div>
    </>
  );
};
