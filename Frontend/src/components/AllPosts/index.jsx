import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './AllPosts.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { useDispatch } from 'react-redux';
import { fetchRemovePost } from '../../redux/slices/posts';
import { CircularProgress } from '@mui/material';

export const AllPosts = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  tags,
  viewsCount,
  children,
  isFullPost,
  isEditable,
  isLoading,
  category
}) => {
  const dispatch = useDispatch()
  if (isLoading) {
    return <CircularProgress/>;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить статью?'))
    dispatch(fetchRemovePost(id))
  };


  const handleTagClick = (tagName) => {
    // Здесь можно выполнить логику фильтрации постов по имени тега
    console.log(`Clicked on tag: ${tagName}`);
    // Здесь можно вызвать функцию, которая будет фильтровать посты по тегу и обновлять состояние компонента с отфильтрованными постами
  };

  const formatedDate = new Date(createdAt).toLocaleString(
    "ru-RU",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }
  );

  return (
    <a href={`/posts/${id}`}>
    <div className={clsx(styles.root)}>
            { isEditable && (
        <div className={styles.editButtons}>
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
      <div  className={styles.indention}>
          
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
           {title}
          </h2>

      
        </div>
        
        <span className={styles.date}>  <ul className={styles.tags}>
            {category}
          </ul> <UserInfo {...user} additionalText={formatedDate} /><span className={styles.eye}><EyeIcon sx={{ fontSize: '18px' }}/>
              {viewsCount}</span>
        </span>
      </div>
    </div>
    </a>
  );
};
