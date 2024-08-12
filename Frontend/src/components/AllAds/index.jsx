import React from "react";
import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./Ad.module.scss";
import { CircularProgress, IconButton } from "@mui/material";
import { fetchRemoveAds } from "../../redux/slices/ads"; 
import { useDispatch } from "react-redux";

export const AllAds = ({
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
    if (window.confirm('Вы действительно хотите удалить афишу?')) {
      dispatch(fetchRemoveAds(id));
    }
  };

  const formatedDate = new Date(createdAt).toLocaleString("ru-RU", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <a href={`/ads/${id}`}>
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

      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {imageUrls.length > 0 && (
        <div className={styles.imageContainer}>
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={`http://localhost:4444${imageUrls[0]}`}
            alt={title}
          />
        </div>
      )}
        <div className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
   
        {title}
        </div>
        <div className={clsx(styles.price)}>{price} ₽</div>
        <div className={clsx(styles.indention, { [styles.indentionFull]: isFullPost })}>
          <ul className={styles.tags}>
            {adcategory}
          </ul>
          <h2 className={clsx(styles.date, { [styles.titleFull]: isFullPost })}>
            <span className={styles.date}>{formatedDate}</span>
          </h2>
        </div>
      </div>
      {children && <div className={styles.content}>{children}</div>}
    </div>
    </a>
  );
};
