import React from "react";
import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./Ad.module.scss";
import { CircularProgress, IconButton } from "@mui/material";
import { fetchRemoveAds } from "../../redux/slices/ads";
import { useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

export const Ad = ({
  id,
  title,
  createdAt,
  imageUrls = [],
  tags,
  price,
  phone,
  children,
  isFullPost,
  isLoading,
  isEditable,
  adcategory
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <CircularProgress/>;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить афишу?'))
      dispatch(fetchRemoveAds(id));
  };

  const formatedDate = new Date(createdAt).toLocaleString("ru-RU", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className={clsx(styles.container, { [styles.containerFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <a href={`/ads/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </a>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}

      {Array.isArray(imageUrls) && imageUrls.length > 0 && (
        <Carousel responsive={responsive} infinite={true} showDots={true}>
          {imageUrls.map((url, index) => (
            <div key={index} className={styles.carouselItem}>
              <img
                className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
                src={`https//87.228.19.239:4444/api${url}`}
                alt={title}
              />
            </div>
          ))}
        </Carousel>
      )}

      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        <div className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
          {isFullPost ? title : <a href={`/ads/${id}`}>{title}{}</a>}
        </div>
        <div className={clsx(styles.price)}>{price} ₽</div>
        <div className={clsx(styles.indention, { [styles.indentionFull]: isFullPost })}>
          
          <ul className={styles.tags}>
            {adcategory}
          </ul>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
          <span className={styles.date}><div {...createdAt} additionalText={formatedDate} /></span>
          </h2>
        </div>
        {children && <div className={styles.content}>{children}</div>}

      </div>

      
    </div>
  );
};
