import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { useDispatch } from 'react-redux';
import { fetchRemovePost } from '../../redux/slices/posts';

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  category,
  viewsCount,
  children,
  isFullPost,
  isLoading,
  isEditable,
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
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      dispatch(fetchRemovePost(id));
    }
  };

  const formatedDate = new Date(createdAt).toLocaleString('ru-RU', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      <a href={`/posts/${id}`}>
        {isEditable && (
          <div className={clsx(styles.editButtons, { [styles.editButtonsFull]: isFullPost })}>
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
        {imageUrl && (
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={imageUrl}
            alt={title}
          />
        )}
        <div className={styles.wrapper}>
          <span className={styles.date}>
            <UserInfo {...user} additionalText={formatedDate} />
            <span className={styles.eye}>
              <EyeIcon sx={{ fontSize: '18px' }} />
              {viewsCount}
            </span>
          </span>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <a href={`/posts/${id}`}>{title}</a>}
          </h2>
          <div className={styles.indention}>
            <span className={styles.tags}>
              {category && category.name ? category.name : ''}
            </span>
            {children && <div className={styles.content}>{children}</div>}
          </div>
        </div>
      </a>
    </div>
  );
};
