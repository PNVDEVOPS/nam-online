import React, { Suspense, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select, Button, Typography, TextField, CircularProgress } from "@mui/material";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { AllPosts } from "../components/AllPosts";
import { fetchCategories, selectCategories } from "../redux/slices/categories";
import styles from "./AllPostsPage.module.scss";
import { ThemeProvider } from "@emotion/react";
import theme from "../components/Theme";
import SidereklamaList from "../components/Sidereklamalist";
import { CiSearch } from "react-icons/ci";

export const AllPostsPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const categories = useSelector(selectCategories);

  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [visiblePostsCount, setVisiblePostsCount] = useState(6);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Все новости");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "createdAt" || selectedValue === "viewsCount") {
      setSortBy(selectedValue);
    } else {
      setSelectedCategory(selectedValue);
      setIsLoadingPosts(true);
      setCategoryTitle(selectedValue);
    }
  };

  const loadPostsByCategory = async () => {
    try {
      await dispatch(fetchPosts(selectedCategory));
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchCategories());
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      loadPostsByCategory();
    }
  }, [selectedCategory]);

  const handleShowMore = () => {
    setVisiblePostsCount((prevCount) => prevCount + 6);
  };

  const sortByFunction = (a, b) => {
    if (sortBy === "viewsCount") {
      return b.viewsCount - a.viewsCount;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  };

  const filteredPosts = posts.items.filter((post) => {
    const matchesCategory = selectedCategory
      ? post.category && post.category.name === selectedCategory
      : true;
    const matchesSearchQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearchQuery;
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid className={clsx(styles.wrapper)} container spacing={0}>
        <div className={styles.container}>
          {categories && Array.isArray(categories.items) && (
            isMobile ? (
              <FormControl variant="outlined" fullWidth   sx={{
                display: isMobile ? 'flex' : 'inline-block',
                width: isMobile ? '100%' : '0',
                marginBottom: isMobile ?  0 : 0
              }} >
                <InputLabel>Категории</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCategoryTitle(e.target.value || "Все новости");
                  }}
                  label="Категории"
                >
                  <MenuItem value="">Все новости</MenuItem>
                  {categories.items.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <>
                <div
                  className={clsx(styles.category, {
                    [styles.selected]: selectedCategory === "",
                  })}
                  onClick={() => {
                    setSelectedCategory("");
                    setCategoryTitle("Все новости");
                  }}
                >
                  Все новости
                </div>
                {categories.items.map((category) => (
                  <div
                    key={category.id}
                    className={clsx(styles.category, {
                      [styles.selected]: selectedCategory === category.name,
                    })}
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setCategoryTitle(category.name);
                    }}
                  >
                    {category.name}
                  </div>
                ))}
              </>
            )
          )}
        </div>
        <div className={clsx(styles.root)}>
          <h2 className={styles.news}>
            {categoryTitle}
            <FormControl variant="standard" sx={{ ml: 4, minWidth: 120, p: 0, mt: -2 }}>
              <InputLabel id="sort-by-label">Сортировать по</InputLabel>
              <Select labelId="sort-by-label" id="sort-by" value={sortBy} onChange={handleSortChange}>
                <MenuItem value="createdAt">Дате создания</MenuItem>
                <MenuItem value="viewsCount">Просмотрам</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              placeholder= "Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              size="small"
              sx={{ width: 200, marginLeft: 5, marginRight: 0, marginBottom: 1 }}
            />
          </h2>
          <div className={clsx(styles.scroll)}>
            {isPostLoading ? (
              <div><CircularProgress></CircularProgress></div>
            ) : (
              <Suspense fallback={<div></div>}>
                {filteredPosts.length > 0 ? (
                  filteredPosts
                    .sort(sortByFunction)
                    .slice(0, visiblePostsCount)
                    .map((obj, index) => (
                      <AllPosts
                        key={index}
                        id={obj._id}
                        title={obj.title}
                        imageUrl={obj.imageUrl ? `http://87.228.19.239:4444${obj.imageUrl}` : ""}
                        createdAt={obj.createdAt}
                        viewsCount={obj.viewsCount}
                        commentsCount={3}
                        tags={obj.tags}
                        category={obj.category && obj.category.name ? obj.category.name : ""}
                        isEditable={!!userData}
                      />
                      
                    ))
                ) : (
                  <Typography variant="h6" align="center">
                    Здесь пока нет постов
                  </Typography>
                )}
              </Suspense>
            )}
            <span className={clsx(styles.widget)}>
          <SidereklamaList></SidereklamaList>
        </span>
          </div>
          
          {visiblePostsCount < filteredPosts.length && (
            <Button variant="contained" color="primary" onClick={handleShowMore} sx={{ mt: 2, mb: 2 }}>
              Показать еще
            </Button>
          )}
    
        </div>
    
      </Grid>
    </ThemeProvider>
  );
};