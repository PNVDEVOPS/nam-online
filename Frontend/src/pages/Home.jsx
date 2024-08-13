import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.scss";
import clsx from "clsx";

import { FaTaxi } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

import { Post } from "../components/Post";
import { PostSub } from "../components/PostSub";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Afisha } from "../components/Afisha";
import { fetchAfTags, fetchAfishas } from "../redux/slices/afishas";
import { Banner } from "../components/Banner";
import { fetchBanners } from "../redux/slices/banners";
import { FaBus } from "react-icons/fa";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import WeatherWidget from "../components/Weather/WeatherWidget";
import { Ad } from "../components/Ad";
import { fetchAds } from "../redux/slices/ads";
import { Event } from "../components/Event";
import { fetchEvents } from "../redux/slices/events";
import { fetchCategories } from "../redux/slices/categories";
import { Cafe } from "../components/CafeInfo/CafeInfo";
import { fetchCafes } from "../redux/slices/cafes";
import { fetchCafeCategories } from "../redux/slices/cafecategories";
import { fetchMenuItems } from "../redux/slices/menuitems";
import { fetchMenuCategories } from "../redux/slices/menucategories";
import { Topreklama } from "../components/Topreklama";
import SidereklamaList from "../components/Sidereklamalist";
import ImportantreklamaList from "../components/Importantreklamalist";

// import Carousel from 'react-bootstrap/Carousel';

export async function getStaticProps() {
  const res = await fetch("https//87.228.19.239:4444/api/posts");
  const posts = await res.json();

  return {
    props: { posts },
  };
}

export const Home = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },

      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },

      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },

      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const bannerroot = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      partialVisibilityGutter: 100,
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      partialVisibilityGutter: 300,
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      partialVisibilityGutter: 40,
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      partialVisibilityGutter: 40,
      items: 1,
    },
  };

  const afisharoot = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const { ads } = useSelector((state) => state.ads);
  const { afishas, aftags } = useSelector((state) => state.afishas);
  const { banners } = useSelector((state) => state.banners);
  const { events } = useSelector((state) => state.events);
  const { categories } = useSelector((state) => state.categories);

  const { cafes } = useSelector((state) => state.cafes);
  const { menuitems } = useSelector((state) => state.menuitems);


  const isAfishaLoading = afishas.status === "loading";
  const isAdLoading = ads.status === "loading";
  const isBannerLoading = banners.status === "loading";
  const isPostLoading = posts.status === "loading";
  const isEventLoading = events && events.status === "loading";
  const isCafeLoading = cafes && cafes.status === "loading";

  

  const isTagsLoading = tags.status === "loading";
  const isAfTagsLoading = aftags.status === "loading";

  const [sortBy, setSortBy] = useState("createdAt");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchAfishas());
    dispatch(fetchBanners());
    dispatch(fetchTags());
    dispatch(fetchAfTags());
    dispatch(fetchAds());
    dispatch(fetchEvents());
    dispatch(fetchCategories());

    dispatch(fetchCafes());
    dispatch(fetchCafeCategories());
    dispatch(fetchMenuCategories());
    dispatch(fetchMenuItems());

  }, [dispatch]);

  return (
    <>
      
      <Grid className={clsx(styles.wrapper)} container spacing={0} xs>
      
        <div className={clsx(styles.root)}>
          <Link to="/allpostspage" >
          <h2 className={clsx(styles.glavn)}>Главные новости</h2>
          </Link>
          <div className={clsx(styles.main)}>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={10000}
              keyBoardControl={true}
              customTransition="transform 300ms ease-in-out"
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              // deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
            {[...posts.items]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Сортировка по дате создания в обратном порядке
  .slice(0, 10) // Взять первые 10 элементов (самые новые)
  .map((obj, index) =>
    isPostLoading ? (
      <Post key={index} isLoading={true} />
    ) : (
      <Post
        key={index}
        id={obj._id}
        title={obj.title}
        imageUrl={
          obj.imageUrl ? `https//87.228.19.239:4444/api${obj.imageUrl}` : ""
        }
        user={obj.user}
        createdAt={obj.createdAt}
        viewsCount={obj.viewsCount}
        commentsCount={3}
        tags={obj.tags}
        isEditable={userData && userData._id === obj.user._id}
        category={obj.category && obj.category.name ? obj.category.name : ""}
      />
    )
  )}
            </Carousel>
          </div>

          <div>
            <div><ImportantreklamaList /></div>
          </div>
        </div>

      {/* Новые новости */}
      <div className={clsx(styles.root)}>
        <h2 className={styles.news}>
          Еще новости
          <FormControl
            variant="standard"
            sx={{ ml: 4, minWidth: 120, p: 0, mt: -2 }}
          >
            <InputLabel>Сортировать по</InputLabel>
            <Select value={sortBy} onChange={handleSortChange}>
              <MenuItem value="createdAt">Дате создания</MenuItem>
              <MenuItem value="viewsCount">Просмотрам</MenuItem>
            </Select>
          </FormControl>
        </h2>
        <div className={clsx(styles.scroll)}>
          {[...posts.items]
            .sort((a, b) => {
              if (sortBy === "viewsCount") {
                return b.viewsCount - a.viewsCount; // Сортировка по просмотрам
              } else {
                return new Date(b.createdAt) - new Date(a.createdAt); // Сортировка по дате создания
              }
            })
            .map((obj, index) => (
              <PostSub
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={
                obj.imageUrl ? `https//87.228.19.239:4444/api${obj.imageUrl}` : ""
                }
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData && userData._id === obj.user._id}
                category={obj.category}
              />
            ))}
        </div>
      </div>
        <div className={clsx(styles.widget)}><WeatherWidget></WeatherWidget><div><SidereklamaList/></div> </div>
        
        <div className={clsx(styles.information)} item>
          <h2>Информация</h2>
          <div className={clsx(styles.inforoot)}>
            <span>
              <Link to='buses'>
              <span className={clsx(styles.infoicon)}>
                <FaBus size={50} color="white" />
              </span>
              <span className={clsx(styles.info)}>Автобусы</span>
              </Link>
            </span>
            {/* <span>
              <span className={clsx(styles.infoicon)}>
                <FaTaxi size={50} color="white" />
              </span>
              <span className={clsx(styles.info)}>Такси</span>
            </span> */}
            <span>
              <Link to='allimportantreklamas'>
              <span className={clsx(styles.infoicon)}>
                <FaInfo size={50} color="white" />
              </span>
              
              <span className={clsx(styles.info)}>Важные объявления</span>
              </Link>
            </span>
           
            <span>
              <Link to='allcontactspage'>
              <span className={clsx(styles.infoicon)}>
                <FaAddressBook size={50} color="white" />
              </span>
              <span className={clsx(styles.info)}>Организации и контакты</span>
              </Link>
            </span>
            <span>
              <span className={clsx(styles.infoicon)}>
                <IoMailSharp size={50} color="white" />
              </span>
              <span className={clsx(styles.info)}>Разместить</span>
            </span>
          </div>
          <h2>Баннеры</h2>

          <div className={clsx(styles.banners)}>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={bannerroot}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={10000}
              keyBoardControl={true}
              customTransition="transform 300ms ease-in-out"
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              // deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              partialVisible={true}
            >
              {banners.items.map(
                (obj, index) =>
                  isBannerLoading ? (
                    <Banner key={index} isLoading={true} />
                  ) : (
                    <Banner
                      id={obj._id}
                      title={obj.title}
                      imageUrl={
                        obj.imageUrl
                          ? `https//87.228.19.239:4444/api${obj.imageUrl}`
                          : ""
                      }
                      isEditable={userData && userData._id === obj.user._id}

                      createdAt={obj.createdAt}
                     
                    />
                  )
              )}
            </Carousel>
          </div>
        </div>
        <div  className={clsx(styles.allafishas)}>
        <div>
          <h2>Кино</h2>

          <div className={clsx(styles.afishas)}>
          <Carousel
    swipeable={true}
    draggable={true}
    showDots={false}
    responsive={afisharoot}
    ssr={true} // means to render carousel on server-side.
    infinite={true}
    autoPlay={true}
    autoPlaySpeed={10000}
    keyBoardControl={true}
    customTransition="transform 300ms ease-in-out"
    transitionDuration={1000}
    containerClass="carousel-container"
    removeArrowOnDeviceType={["tablet", "mobile"]}
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
  >
    {(isAfishaLoading ? [...Array(5)] : afishas.items).map(
      (obj, index) =>
        isAfishaLoading ? (
          <Afisha key={index} isLoading={true} />
        ) : (
          <Afisha
            key={obj._id}
            id={obj._id}
            title={obj.title}
            imageUrl={
              obj.imageUrl ? `https//87.228.19.239:4444/api${obj.imageUrl}` : ""
            }
            user={obj.user}
            createdAt={obj.createdAt}
            commentsCount={3}
            aftags={obj.aftags}
            isEditable={userData && userData._id === obj.user._id}
          />
        )
    )}
  </Carousel>
          </div>
        </div>
        <div>
          <h2>Афиша</h2>

          <div className={clsx(styles.afishases)}>
          <Carousel
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={afisharoot}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={10000}
              keyBoardControl={true}
              customTransition="transform 300ms ease-in-out"
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              // deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
            {(isEventLoading ? [...Array(5)] : events.items).map(
              (obj, index) =>
                isEventLoading ? (
                  <Event key={index} isLoading={true} />
                ) : (
                  <Event
                    id={obj._id}
                    title={obj.title}
                    imageUrl={
                      obj.imageUrl ? `https//87.228.19.239:4444/api${obj.imageUrl}` : ""
                    }
                    user={obj.user}
                    createdAt={obj.createdAt}
                    aftags={obj.aftags}
                    secondphone={obj.secondphone}
                    phone={obj.phone}
                    date={obj.date}
                    isEditable={userData && userData._id === obj.user._id}

                  />
                )
            )}
            </Carousel>
          </div>
        </div>
        </div>
        {/* {(isCafeLoading ? [...Array(5)] : cafes.items).map(
              (obj, index) =>
                isEventLoading ? (
                  <Cafe key={index} isLoading={true} />
                ) : (
        <Cafe
        id={obj.id}
        name={obj.name}
        time={obj.time}
        // contact={obj.contact}
        // address={obj.address}
        // phone={obj.phone}
        // whatsapp={obj.whatsapp}
        avatar={obj.avatar}
        price={obj.price}
        ></Cafe>
                )
              )} */}
      </Grid>
    </>
  );
};
