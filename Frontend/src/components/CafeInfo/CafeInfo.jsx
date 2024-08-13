import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { IoMdTime } from "react-icons/io";
import styles from './CafeInfo.module.scss';
import { useDispatch } from 'react-redux';
import { fetchRemoveCafe } from '../../redux/slices/cafes';

export const CafeInfo = ({
  id,
  menu,
  contact,
  time,
  cafecategories,
  name,
  avatar,
  isFullPost,
}) => {
  const dispatch = useDispatch();

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить кафе?')) {
      dispatch(fetchRemoveCafe(id));
    }
  };

  const avatarUrl = avatar ? `https//87.228.19.239:4444/api${avatar}` : '';
  const menuUrl = menu ? `https//87.228.19.239:4444/api${menu}` : '';

  console.log("Cafe categories:", cafecategories);

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      <a href={`/cafes/${id}`}>
        <div className={styles.editButtons}>
          <a href={`/cafes/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </a>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
        {avatar && (
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={avatarUrl}
            alt={name}
          />
        )}
        <div className={styles.wrapper}>
          <div className={styles.indention}>
            <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
              {name}
            </h2>
            <ul className={styles.tags}>
              {cafecategories && cafecategories.map((category) => (
                category && <li key={category._id}>{category.name}</li>
              ))}
            </ul>
            {time && <div className={styles.content}><IoMdTime /> {time}</div>}
            {contact && (
              <div className={styles.contactInfo}>
                <div>Адрес: {contact.address}</div>
                <div>Телефон: {contact.phone}</div>
                <div>WhatsApp: {contact.whatsapp}</div>
              </div>
            )}
            {menu && (
              <div className={styles.menu}>
                <img src={menuUrl} alt="Menu" />
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};
