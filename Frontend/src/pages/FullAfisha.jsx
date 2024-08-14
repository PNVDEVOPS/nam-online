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
import { Afisha } from "../components/Afisha";
import { fetchAfishas, fetchAfTags } from "../redux/slices/afishas";
import WeekSchedule from "../components/shedule/WeekShedule";
import MonthSchedule from "../components/shedule/CinemaShedule";
import CinemaSchedule from "../components/shedule/CinemaShedule";
import { Share } from "../components/SharePage/Share";

export const FullAfisha = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  const { id } = useParams();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { afishas, aftags } = useSelector((state) => state.afishas);

  const isAfishasLoading = afishas.status === "loading";
  const isTagsLoading = aftags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchAfTags());
    dispatch(fetchAfishas());
  }, [dispatch]);

  React.useEffect(() => {
    axios
      .get(`/afishas/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении афиши");
      });
  }, []);

  if (isLoading) {
    return <Afisha isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Grid className={clsx(styles.FullAfishaWrapper)} item xs spacing={2}>
        <Afisha
          id={data.id}
          title={data.title}
          imageUrl={
            data.imageUrl ? `https://xn--80ayb.online:4444${data.imageUrl}` : ""
          }
          createdAt={data.createdAt}
          viewsCount={data.viewsCount}
          commentsCount={3}
          aftags={data.aftags}
          director={data.director}
          country={data.country}
          role={data.role}
          phone={data.phone}
          secondphondphone={data.secondphone}
          mon={data.mon}
          tue={data.tue}
          wed={data.wed}
          thu={data.thu}
          fri={data.fri}
          sat={data.sat}
          sun={data.sun}

          isEditable={userData && userData._id === data.user._id}
          isFullPost
        >
          <div>
            <span>Контакты: {data.phone}</span>
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
        </Afisha>
      </Grid>
      <div className={clsx(styles.about)}>
        <h2>О фильме</h2>
        <ReactMarkdown className={clsx(styles.text)} children={data.text} />
      </div>
      <table  className={clsx(styles.table)}>
        <tr className={clsx(styles.tab)}>
          <td className={clsx(styles.taba)}>Режиссер:</td> 
          <td>{data.director}</td>
        </tr >
        <tr className={clsx(styles.tab)}>
          <td className={clsx(styles.taba)}>В ролях:</td> 
          <td>{data.role}</td>
        </tr>
  
        <tr className={clsx(styles.tab)}>
          <td className={clsx(styles.taba)}>Страна:</td> 
          <td>{data.country}</td>
        </tr>
      </table>
      <div>
      <table class={clsx(styles.schedule)}>
        <thead>
          <p className={clsx(styles.taba)}>
          Сеансы на этой неделе:
          </p>
          <tr>
            <th>Пн</th>
            <th>Вт</th>
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
            <th>Вс</th>
          </tr>
        </thead>
        <tbody>
          <tr>

            <td class={clsx(styles.event)}>{data.mon}</td>
            <td class={clsx(styles.event)}>{data.tue}</td>
            <td class={clsx(styles.event)}>{data.wed}</td>
            <td class={clsx(styles.event)}>{data.thu}</td>
            <td class={clsx(styles.event)}>{data.fri}</td>
            <td class={clsx(styles.event)}>{data.sat}</td>
            <td class={clsx(styles.event)}>{data.sun}</td>
          </tr>
          {/* Добавьте остальные строки для других временных интервалов */}
        </tbody>
      </table>
    </div>
    </>
  );
};
