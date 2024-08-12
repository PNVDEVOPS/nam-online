import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import { Post } from "../components/Post";
import axios from "../axios";
import { FormControl, Grid, InputLabel, MenuItem, Select, CircularProgress } from "@mui/material";
import { PostSub } from "../components/PostSub";
import { TagsBlock } from "../components/TagsBlock";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.scss";
import clsx from "clsx";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { fetchCategories, selectCategories } from "../redux/slices/categories";
import SidereklamaList from "../components/Sidereklamalist";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const isPostLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const categories = useSelector(selectCategories);
  const [sortBy, setSortBy] = useState("createdAt");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }, [dispatch]);

  React.useEffect(() => {
    axios.get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  console.log('FullPost data:', data); // Проверим, что выводится в консоль

  return (
    <>
      <Grid className={clsx(styles.FullPostWrapper)} item xs spacing={2}>

          <div className={clsx(styles.fullscroll)}>
          <span>
          <h2 className={styles.news}>Последние новости</h2>
          <FormControl
            variant="standard"
            sx={{ ml: 0, minWidth: 120, p: 0, mt: 2, mb: 2 }}
          >
            <InputLabel>Сортировать по</InputLabel>
            <Select value={sortBy} onChange={handleSortChange}>
              <MenuItem value="createdAt">Дате создания</MenuItem>
              <MenuItem value="viewsCount">Просмотрам</MenuItem>
            </Select>
          </FormControl>
          </span>
            {(isPostLoading ? [] : posts.items)
              .slice()
              .sort((a, b) => {
                if (sortBy === "viewsCount") {
                  return b.viewsCount - a.viewsCount;
                } else {
                  return new Date(b.createdAt) - new Date(a.createdAt);
                }
              })
              .map((data, index) =>
                isPostLoading ? (
                  <PostSub key={index} isLoading={true} />
                ) : (
                  <PostSub
                    key={data._id}
                    id={data._id}
                    title={data.title}
                    createdAt={data.createdAt}
                    viewsCount={data.viewsCount}
                    commentsCount={3}
                    tags={data.tags}
                    isEditable={userData && userData._id === data.user._id}
                  />
                )
              )}
          </div>
       
        <div className={clsx(styles.postspage)}>
          <Post
            id={data._id}
            title={data.title}
            imageUrl={data.imageUrl ? `http://87.228.19.239:4444${data.imageUrl}` : ''}
            createdAt={data.createdAt}
            viewsCount={data.viewsCount}
            commentsCount={3}
            tags={data.tags}
            category={data.category}
            isEditable={userData && userData._id === data.user._id}
            isFullPost
          >
            <ReactMarkdown children={data.text} />
          </Post>
        </div>
        <div className={clsx(styles.sidereklama)}>
          <SidereklamaList />
        </div>
        
      </Grid>
    </>
  );
};
