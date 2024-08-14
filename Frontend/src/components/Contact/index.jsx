import React from "react";
import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, CircularProgress } from "@mui/material";

import styles from "./Contact.module.scss";
import { fetchRemoveContact } from "../../redux/slices/contacts";
import { useDispatch } from "react-redux";

export const Contact = ({
  id,
  title,
  text,
  createdAt,
  imageUrl,
  phone,
  secondphone,
  mail,
  isFullPost,
  isLoading,
  isEditable,
  vacationcategory,
}) => {
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить контакт?')) {
      dispatch(fetchRemoveContact(id));
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
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <a href={`/contacts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </a>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}

      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={`https://xn--80ayb.online:4444/api${imageUrl}`}
          alt={title}
        />
      )}

      <div className={clsx(styles.content, { [styles.contentFull]: isFullPost })}>
        <div className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
          {isFullPost ? title : <a href={`/contacts/${id}`}>{title}</a>}
        </div>
        <div className={clsx(styles.text)}>{text}</div>
        <div className={clsx(styles.phone)}>{phone}</div>
        <div className={clsx(styles.secondphone)}>{secondphone}</div>
        <div className={clsx(styles.mail)}>{mail}</div>
        <div className={clsx(styles.indention, { [styles.indentionFull]: isFullPost })}>
          <ul className={styles.tags}>
            {vacationcategory}
          </ul>
          
          <span className={styles.date}>{formatedDate}</span>
        </div>
      </div>
    </div>
  );
};
