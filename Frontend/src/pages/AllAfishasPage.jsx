import React, { Suspense, useState } from "react";
import Grid from "@mui/material/Grid";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { fetchAfishas, fetchRemoveAfisha, fetchAfTags } from "../redux/slices/afishas";
import { AllPosts } from "../components/AllPosts";
import { TagsBlock } from "../components/TagsBlock";
import styles from "./AllAfishasPage.module.scss";
import { Afisha } from "../components/Afisha";
import { Event } from "../components/Event";
import { fetchEvents,  fetchRemoveEvent } from "../redux/slices/events";

export const AllAfishasPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { afishas, aftags } = useSelector((state) => state.afishas);
  const { events } = useSelector((state) => state.events);

  const isAfishaLoading = afishas.status === "loading";
  const isEventLoading = afishas.status === "loading";
  const isAfTagsLoading = aftags.status === "loading";

  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("createdAt"); // Стандартная сортировка по дате создания
  const [visiblePostsCount, setVisiblePostsCount] = useState(6); // Начальное количество отображаемых постов

  React.useEffect(() => {
    dispatch(fetchAfishas());
    dispatch(fetchEvents());
    dispatch(fetchAfTags());
  }, [dispatch]);



  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleShowMore = () => {
    setVisiblePostsCount((prevCount) => prevCount + 5); // Увеличиваем количество отображаемых постов на 5
  };

  const sortByFunction = (a, b) => {
    if (sortBy === "viewsCount") {
      return b.viewsCount - a.viewsCount; // Сортировка по просмотрам
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt); // Сортировка по дате создания
    }
  };

  return (
    <>
      <Grid className={clsx(styles.wrapper)} container spacing={0} xs>

        <div className={clsx(styles.root)}>
          
          <h2 className={styles.afishas}>
            Кино
          
          </h2>

          <div className={clsx(styles.scroll)}>
            
            {isAfishaLoading ? (
              <div><CircularProgress></CircularProgress></div>
            ) : (
              <Suspense fallback={<div><CircularProgress></CircularProgress></div>}>
                {afishas.items
                  .filter((post) =>
                    selectedTag ? post.aftags.includes(selectedTag) : true
                  )
                  .sort(sortByFunction)
                  .slice(0, visiblePostsCount)
                  .map((obj, index) => (
                    <Afisha
                    id={obj._id}
                    title={obj.title}
                    imageUrl={
                      obj.imageUrl ? `https//87.228.19.239:4444/api${obj.imageUrl}` : ""
                    }
                    user={obj.user}
                    createdAt={obj.createdAt}
                    commentsCount={3}
                    aftags={obj.aftags}
                    isEditable={!!userData}

                    />
                  ))}
              </Suspense>
            )}
          </div>

          <h2 className={styles.afishas}>Афиша</h2>

          <div className={clsx(styles.scroll)}>
            
            {isAfishaLoading ? (
              <CircularProgress/>
            ) : (
              <Suspense fallback={<CircularProgress/>}>
                {events.items
                  .filter((post) =>
                    selectedTag ? post.aftags.includes(selectedTag) : true
                  )
                  .sort(sortByFunction)
                  .slice(0, visiblePostsCount)
                  .map((obj, index) => (
                    <Event
                    id={obj._id}
                    title={obj.title}
                    imageUrl={
                      obj.imageUrl ? `https//localhost:4444/api${obj.imageUrl}` : ""
                    }
                    user={obj.user}
                    createdAt={obj.createdAt}
                    commentsCount={3}
                    aftags={obj.aftags}
                    isEditable={!!userData}

                    />
                  ))}
              </Suspense>
            )}
          </div>

          {/* Кнопка "Показать еще" */}
          {visiblePostsCount < afishas.items.length && (
                  <Button variant="contained" color="primary" onClick={handleShowMore} sx={{ mt: 2, mb: 2 }}>
                  Показать еще
                </Button>
          )}
        </div>
        <div className={clsx(styles.widget)}>
          {/* <div className={clsx(styles.ads)}>Реклама</div> */}
        </div>
      </Grid>
    </>
  );
};
