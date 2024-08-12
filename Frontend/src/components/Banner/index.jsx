import React from "react";
import clsx from "clsx";

import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./Banner.module.scss";
import { UserInfo } from "../UserInfo";
import { BannersSkeleton } from "./Skeleton";
import { useDispatch } from "react-redux";
import { CircularProgress, IconButton } from "@mui/material";
import { fetchRemoveBanner } from "../../redux/slices/banners";

export const Banner = ({
  id,
  title,
  createdAt,
  imageUrl,
  tags,
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
    if (window.confirm("Вы действительно хотите удалить banner?"))
      dispatch(fetchRemoveBanner(id));
  };

  return (
    
    <div
      className={clsx(styles.container, { [styles.containerFull]: isFullPost })}
    >
         { isEditable && (
      <div className={clsx(styles.editButtons, { [styles.editButtons]: isFullPost })}>
        <a href={`/posts/${id}/edit`}>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </a>
        <IconButton onClick={onClickRemove} color="secondary">
          <DeleteIcon />
        </IconButton>
      </div>
      )}
      <a href={`/banners/${id}`}>
      <div className={clsx(styles.bg, { [styles.bgFull]: isFullPost })}>
        {/* <img
          className={clsx(styles.background, {
            [styles.backgroundFull]: isFullPost,
          })}
          src={imageUrl}
          alt={title}
        /> */}
      </div>

      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        {isEditable && (
          <div className={styles.editButtons}>
            <a href={`/banners/${id}/edit`}>
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
          {/* <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <a href={`/banners/${id}`}>{title}</a>}
          </h2> */}
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            {/* <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li> */}
          </ul>
        </div>
      </div>

      <div
        className={clsx(styles.indention, {
          [styles.indentionFull]: isFullPost,
        })}
      >
        {/* <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
          {isFullPost ? title : <a href={`/banners/${id}`}>{title}</a>}
        </h2> */}
        {children && <div className={styles.content}>{children}</div>}
        <ul className={styles.postDetails}>
          {/* <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li> */}
        </ul>
        {/* <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <a href={`/tags/${name}`}>#{name}</a>
              </li>
            ))}
          </ul> */}
      </div>
      </a>
    </div>
  );
};
