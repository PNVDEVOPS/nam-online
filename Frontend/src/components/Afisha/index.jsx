import React from "react";
import clsx from "clsx";

import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./Afisha.module.scss";
import { UserInfo } from "../UserInfo";
import { AfishaSkeleton } from "./Skeleton";
import { useDispatch } from "react-redux";
import { fetchRemoveAfisha } from "../../redux/slices/afishas";
import { CircularProgress, IconButton } from "@mui/material";

export const Afisha = ({
  id,
  title,
  createdAt,
  imageUrl,
  phone,
  secondphone,
  children,
  isFullPost,
  isLoading,
  isEditable,
  director,
  country,
  role,
  lenght,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <CircularProgress/>;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить афишу?'))
      dispatch(fetchRemoveAfisha(id));
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
      <a className={clsx(styles.a)} href={`/afishas/${id}`}>
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
        { isEditable &&(
          <div className={styles.editButtons}>
            <a href={`/afishas/${id}/edit`}>
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
            {isFullPost ? title : <a href={`/afishas/${id}`}>{title}</a>}
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
          {isFullPost ? title : <a href={`/afishas/${id}`}>{title}</a>}
        </h2>
        {children && <div className={styles.content}>{children}</div>}
        <ul className={styles.postDetails}>
        </ul>
      </div>
      </a>
    </div>
  );
};
