import React from "react";
import clsx from "clsx";

import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./Sidereklama.module.scss";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import { fetchRemoveSidereklama } from "../../redux/slices/sidereklamas";


export const Sidereklama = ({
  id,
  title,
  createdAt,
  imageUrl,
  href,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();


  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить sidereklama?"))
      dispatch(fetchRemoveSidereklama(id));
  };

  return (
    <div
      className={clsx(styles.container, { [styles.containerFull]: isFullPost })}
    >
     
      <a href={href} className={styles.link}>
        <div className={clsx(styles.bg, { [styles.bgFull]: isFullPost })}></div>
        <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        {isEditable && (
        <div className={styles.editButtons}>
          <a href={`/sidereklamas/${id}/edit`}>
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
          
           
          </div>
        </div>
      </a>
    </div>
  );
};
