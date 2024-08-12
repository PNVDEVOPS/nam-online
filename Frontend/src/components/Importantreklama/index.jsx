import React from "react";
import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import { fetchRemoveImportantreklama } from "../../redux/slices/importantreklamas";
import styles from "./Importantreklama.module.scss";
import { Link } from "react-router-dom";

export const Importantreklama = ({
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
    if (window.confirm("Вы действительно хотите удалить importantreklama?"))
      dispatch(fetchRemoveImportantreklama(id));
  };

  return (
    <div className={clsx(styles.container, { [styles.containerFull]: isFullPost })}>
      <Link to='allimportantreklamas'>
      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
     
        {isEditable && (
          <div className={styles.editButtons}>
            
            <a href={`/importantreklamas/${id}/edit`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </a>
            <IconButton onClick={onClickRemove} color="secondary">
              <DeleteIcon />
            </IconButton>
          </div>
        )}
        <a href={href} className={styles.link}>
          <div className={clsx(styles.bg, { [styles.bgFull]: isFullPost })}></div>
          {imageUrl && (
            <img
              className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
              src={imageUrl}
              alt={title}
            />
          )}
          <div className={clsx(styles.menu, { [styles.menuFull]: isFullPost })}>
            {/* Other content here */}
          </div>
        </a>
      </div>
      </Link>
    </div>
  );
};
