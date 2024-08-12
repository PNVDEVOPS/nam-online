import React from "react";
import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./Vacation.module.scss";
import { CircularProgress, IconButton } from "@mui/material";
import { fetchRemoveVacations } from "../../redux/slices/vacations"; 
import { useDispatch } from "react-redux";
import SidereklamaList from "../Sidereklamalist";

export const AllVacations = ({
  id,
  title,
  createdAt,
  imageUrls = [],
  price,
  children,
  isFullPost,
  isLoading,
  isEditable,
  vacationcategory
}) => {
  const dispatch = useDispatch();
  
  if (isLoading) {
    return <CircularProgress/>;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить афишу?')) {
      dispatch(fetchRemoveVacations(id));
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
    <a href={`/vacations/${id}`}>
      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
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
        
        {imageUrls.length > 0 && (
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={`http://localhost:4444${imageUrls[0]}`}
            alt={title}
          />
        )}

        <div className={styles.content}>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.price}>{price} ₽</div>
          <div className={styles.tags}>
            {vacationcategory}
          </div>
          <div className={styles.date}>
            {formatedDate}
          </div>
        </div>
      </div>
    </a>
  );
};
