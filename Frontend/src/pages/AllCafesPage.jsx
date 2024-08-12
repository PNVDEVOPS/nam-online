import React, { Suspense, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select, Button, TextField, CircularProgress, Typography } from "@mui/material";
import { fetchCafes } from "../redux/slices/cafes";
import { CafeInfo } from "../components/CafeInfo/CafeInfo";
import { selectCafeCategories, fetchCafeCategories } from "../redux/slices/cafecategories";
import styles from "./AllCafes.module.scss";
import { ThemeProvider } from "@emotion/react";
import theme from "../components/Theme";

export const AllCafesPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { cafes } = useSelector((state) => state.cafes);
  const cafecategories = useSelector(selectCafeCategories);

  const isCafeLoading = cafes.status === "loading";

  const [selectedCafeCategories, setSelectedCafeCategories] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [visibleCafesCount, setVisibleCafesCount] = useState(6);
  const [isLoadingCafes, setIsLoadingCafes] = useState(false);
  const [cafecategoryTitle, setCafeCategoryTitle] = useState("Все кафе");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "createdAt" || selectedValue === "viewsCount") {
      setSortBy(selectedValue);
    } else {
      setSelectedCafeCategories([selectedValue]);
      setIsLoadingCafes(true);
      setCafeCategoryTitle(selectedValue);
    }
  };

  const loadCafesByCafeCategory = async () => {
    try {
      await dispatch(fetchCafes(selectedCafeCategories));
    } catch (error) {
      console.error("Ошибка загрузки кафе:", error);
    } finally {
      setIsLoadingCafes(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchCafeCategories());
    dispatch(fetchCafes());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCafeCategories.length > 0) {
      loadCafesByCafeCategory();
    }
  }, [selectedCafeCategories]);

  const handleShowMore = () => {
    setVisibleCafesCount((prevCount) => prevCount + 6);
  };

  const sortByFunction = (a, b) => {
    if (sortBy === "viewsCount") {
      return b.viewsCount - a.viewsCount;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid className={clsx(styles.wrapper)} container spacing={0}>
        <div className={styles.container}>
          {cafecategories && Array.isArray(cafecategories.items) && (
            isMobile ? (
              <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Категории</InputLabel>
                <Select
                  multiple
                  value={selectedCafeCategories}
                  onChange={(e) => {
                    setSelectedCafeCategories(e.target.value);
                    setCafeCategoryTitle(e.target.value.join(", ") || "Все кафе");
                  }}
                  label="Категории"
                >
                  <MenuItem value="">Все кафе</MenuItem>
                  {cafecategories.items.map((cafecategory) => (
                    <MenuItem key={cafecategory.id} value={cafecategory.name}>
                      {cafecategory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <>
                <div
                  className={clsx(styles.category, {
                    [styles.selected]: selectedCafeCategories.length === 0,
                  })}
                  onClick={() => {
                    setSelectedCafeCategories([]);
                    setCafeCategoryTitle("Все кафе");
                  }}
                >
                  Все кафе
                </div>
                {cafecategories.items.map((cafecategory) => (
                  <div
                    key={cafecategory.id}
                    className={clsx(styles.category, {
                      [styles.selected]: selectedCafeCategories.includes(cafecategory.name),
                    })}
                    onClick={() => {
                      if (selectedCafeCategories.includes(cafecategory.name)) {
                        setSelectedCafeCategories(selectedCafeCategories.filter((cat) => cat !== cafecategory.name));
                      } else {
                        setSelectedCafeCategories([...selectedCafeCategories, cafecategory.name]);
                      }
                      setCafeCategoryTitle(selectedCafeCategories.join(", "));
                    }}
                  >
                    {cafecategory.name}
                  </div>
                ))}
              </>
            )
          )}
        </div>
        <div className={clsx(styles.root)}>
          <h2 className={styles.news}>
            {cafecategoryTitle}
            <TextField
              variant="outlined"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              size="small"
              sx={{ width: 200, marginLeft: 5, marginRight: 0, marginBottom: 1 }}
            />
          </h2>
          <div className={clsx(styles.scroll)}>
            {isCafeLoading ? (
              <div><CircularProgress></CircularProgress></div>
            ) : (
              <Suspense fallback={<div></div>}>
                {cafes.items
                  .filter((cafe) =>
                    selectedCafeCategories.length > 0
                      ? cafe.cafecategories.some((cafecategory) =>
                          selectedCafeCategories.includes(cafecategory.name)
                        )
                      : true
                  )
                  .sort(sortByFunction)
                  .slice(0, visibleCafesCount)
                  .map((obj, index) => (
                    <CafeInfo
                      key={index}
                      id={obj._id}
                      name={obj.name}
                      time={obj.time}
                      avatar={obj.avatar}
                      price={obj.price}
                      isEditable={userData && userData._id === obj.user._id}
                      cafecategories={obj.cafecategories}             
                    />
                  ))}
              </Suspense>
            )}
          </div>
          {visibleCafesCount < cafes.items.length && (
            <Button variant="contained" color="primary" onClick={handleShowMore} sx={{ mt: 2, mb: 2 }}>
              Показать еще
            </Button>
          )}
        </div>
      </
      Grid>
</ThemeProvider>
);
};

