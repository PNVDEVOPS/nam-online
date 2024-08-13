import React from "react";
import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./Vacation.module.scss";
import { IconButton } from "@mui/material";
import { fetchRemoveVacations } from "../../redux/slices/vacations";
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

export const Vacation = ({
  id,
  title,
  text,
  createdAt,
  imageUrls = [],
  tags,
  price,
  phone,
  mail,
  children,
  isFullPost,
  isLoading,
  isEditable,
  vacationcategory
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить афишу?'))
      dispatch(fetchRemoveVacations(id));
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
          <a href={`/vacations/${id}/edit`}>
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
                src={`https://87.228.19.239:4444/${url}`}
                alt={title}
              />
            </div>
          ))}
        </Carousel>
      )}

      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        <div className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
          {isFullPost ? title : <a href={`/vacations/${id}`}>{title}{}</a>}
        </div>
        <div className={clsx(styles.price)}>{price} ₽</div>
        <div className={clsx(styles.text)}>{text}</div>
        <div className={clsx(styles.mail)}>{phone}</div>
        <div className={clsx(styles.mail)}>{mail}</div>
        <div className={clsx(styles.indention, { [styles.indentionFull]: isFullPost })}>
          
          <ul className={styles.tags}>
            {vacationcategory}
          </ul>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
          <span className={styles.date}><div {...createdAt} additionalText={formatedDate} /></span>
          </h2>
        </div>
      </div>
    </div>
  );
};
