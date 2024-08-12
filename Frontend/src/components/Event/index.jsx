import React from "react";
import clsx from "clsx";

import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./Event.module.scss";
import { UserInfo } from "../UserInfo";
import { EventSkeleton } from "./Skeleton";
import { useDispatch } from "react-redux";
import { fetchRemoveEvent } from "../../redux/slices/events";
import { CircularProgress, IconButton } from "@mui/material";

export const Event = ({
  id,
  title,
  createdAt,
  imageUrl,
  aftags,
  children,
  isFullPost,
  isLoading,
  isEditable,
  phone,
  secondphone,
  date

}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <CircularProgress/>;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить афишу?'))
      dispatch(fetchRemoveEvent(id));
  };

  const formatedDate = new Date(createdAt).toLocaleString("ru-RU", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div
      className={clsx(styles.container, { [styles.containerFull]: isFullPost })}
    >
      <a className={clsx(styles.a)} href={`/events/${id}`}>
      <div className={clsx(styles.bg, { [styles.bgFull]: isFullPost })}>
        <img
          className={clsx(styles.background, {
            [styles.backgroundFull]: isFullPost,
          })}
          src={imageUrl}
          alt={title}
        />
      </div>

      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        {isEditable && (
          <div className={styles.editButtons}>
            <a href={`/events/${id}/edit`}>
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
            src={imageUrl}
            alt={title}
          />
        )}

        <div
          className={clsx(styles.menu, {
            [styles.menuFull]: isFullPost,
          })}
        >
  
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <a href={`/events/${id}`}>{title}</a>}
          </h2>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
          </ul>
        </div>
      </div>

      <div
        className={clsx(styles.indention, {
          [styles.indentionFull]: isFullPost,
        })}
      >
  
        <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
          {isFullPost ? title : <a href={`/events/${id}`}>{title}</a>}
        </h2>
        
      </div>
      </a>
    </div>
  );
};
