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
import { Banner } from "../components/Banner";
import { fetchBanners, fetchTags} from "../redux/slices/banners";

export const FullBanner = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  const { id } = useParams();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { banners, tags } = useSelector((state) => state.banners);

//   const isBannerLoading = banners.status === "loading";
//   const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchBanners());
  }, [dispatch]);

  React.useEffect(() => {
    axios
      .get(`/banners/${id}`)
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
    return <Banner isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Grid className={clsx(styles.FullBannerWrapper)} item xs spacing={2}>
        <Banner
          id={data.id}
          title={data.title}
          imageUrl={
            data.imageUrl ? `https//87.228.19.239:4444/api${data.imageUrl}` : ""
          }
          createdAt={data.createdAt}
          viewsCount={data.viewsCount}
          commentsCount={3}
          tags={data.tags}
        //   director={data.director}
        //   country={data.country}
        //   role={data.role}
        //   lenght={data.lenght}
        isEditable={userData && userData._id === data.user._id}

          isFullPost
        >
          {/* <div>
            <span>Расписание:</span>
            <div className={clsx(styles.timing)}>
              <span></span>
              <span></span>
            </div>
          </div> */}
          
        </Banner>

        {/* <Grid xs={2} item >
        <h2 className={styles.news}>Новые новости
        <FormControl  variant="standard" sx={{ ml: 4, minWidth: 120, p: 0, mt: -2}}>
        <InputLabel  aftags={aftags.items}>Теги</InputLabel>
        <Select
          items={aftags.items}
        >
          <MenuItem value="">
            <em>Без тегов</em>
          </MenuItem>
          <TagsBlock items={aftags.items} isLoading={isTagsLoading} />
          <MenuItem value={10}items={aftags.items}></MenuItem>
          
        </Select>
      </FormControl>
      </h2 >
        
        <div className={clsx(styles.scroll)}>
        {(isAfishasLoading ? [...Array(5)] : afishas.items).map((data, index) => isAfishasLoading ? 
          (<Afisha key={index} isLoading={true}/>
          ) : (
            <PostSub
              id={data._id}
              title={data.title}
              imageUrl={data.imageUrl ? `https//localhost:4444${data.imageUrl}` : ''}
              
              createdAt={data.createdAt}
              viewsCount={data.viewsCount}
              commentsCount={3}
              tags={data.tags}

              isEditable={userData?._id === data.user._id}
            />
          )
          )}
          </div>
        </Grid> */}
      </Grid>
      <div className={clsx(styles.about)}>
        <h2>Об акции</h2>
        <ReactMarkdown className={clsx(styles.text)} children={data.text} />
      </div>
      <div>
            <span>Поделиться:</span>
            <div>
              <FaWhatsapp
                size={25}
                color="white"
                className={clsx(styles.sharing)}
              />
              <LiaTelegramPlane color="white" className={clsx(styles.sharing)} />
              <FaInstagram
                color="white"
                className={clsx(styles.sharing)}
              ></FaInstagram>
            </div>
          </div>
      {/* <table  className={clsx(styles.table)}>
        <tr className={clsx(styles.tab)}>
          <td className={clsx(styles.taba)}>Режиссер:</td> 
          <td>{data.director}</td>
        </tr >
        <tr className={clsx(styles.tab)}>
          <td className={clsx(styles.taba)}>В ролях:</td> 
          <td>{data.role}</td>
        </tr>
        <tr  className={clsx(styles.tab)}>
          <td className={clsx(styles.taba)}>Длина:</td> 
          <td>{data.lenght}</td>
        </tr >
        <tr className={clsx(styles.tab)}>
          <td className={clsx(styles.taba)}>Страна:</td> 
          <td>{data.country}</td>
        </tr>
      </table> */}
    </>
  );
};
