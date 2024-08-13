import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchRemoveBus } from '../../redux/slices/buses';
import clsx from 'clsx';
import styles from "./Bus.module.scss";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";


export const Bus = ({ _id, title, imageUrl, isEditable, isFullPost }) => {
  const dispatch = useDispatch();

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить автобус?')) {
      dispatch(fetchRemoveBus(_id));
    }
  };

  return (
    <div className="bus">
    {isEditable && (
        <div className={styles.editButtons}>
          <a href={`/buses/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </a>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
        
      )}
              <h2 className="title">{title}</h2>
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl.startsWith('http') ? imageUrl : `https//87.228.19.239:4444/api${imageUrl}`}
          alt={title}
        />
      )}
      <div className="content">

      </div>
    </div>
  );
};
