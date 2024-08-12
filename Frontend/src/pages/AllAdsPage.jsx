import React, { Suspense, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select, Button, TextField, CircularProgress, Typography } from "@mui/material";
import { fetchAds } from "../redux/slices/ads";
import { AllAds } from "../components/AllAds";
import { fetchAdCategories, selectAdCategories } from "../redux/slices/adcategories";
import styles from "./AllAdsPage.module.scss";
import { ThemeProvider } from "@emotion/react";
import theme from "../components/Theme";
import SidereklamaList from "../components/Sidereklamalist";

export const AllAdsPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { ads } = useSelector((state) => state.ads);
  const adcategories = useSelector(selectAdCategories);

  const isAdLoading = ads.status === "loading";

  const [selectedAdCategory, setSelectedAdCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [visibleAdsCount, setVisibleAdsCount] = useState(6);
  const [isLoadingAds, setIsLoadingAds] = useState(false);
  const [adcategoryTitle, setAdCategoryTitle] = useState("Все объявления");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "createdAt" || selectedValue === "viewsCount") {
      setSortBy(selectedValue);
    } else {
      setSelectedAdCategory(selectedValue);
      setIsLoadingAds(true);
      setAdCategoryTitle(selectedValue);
    }
  };

  const loadAdsByAdCategory = async () => {
    try {
      await dispatch(fetchAds(selectedAdCategory));
    } catch (error) {
      console.error("Ошибка загрузки объявлений:", error);
    } finally {
      setIsLoadingAds(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchAdCategories());
    dispatch(fetchAds());
  }, [dispatch]);

  useEffect(() => {
    if (selectedAdCategory) {
      loadAdsByAdCategory();
    }
  }, [selectedAdCategory]);

  const handleShowMore = () => {
    setVisibleAdsCount((prevCount) => prevCount + 6);
  };

  const sortByFunction = (a, b) => {
    if (sortBy === "viewsCount") {
      return b.viewsCount - a.viewsCount;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  };

  const filteredAds = ads.items.filter((ad) => {
    const matchesCategory = selectedAdCategory
      ? ad.adcategory && ad.adcategory.name === selectedAdCategory
      : true;
    const matchesSearchQuery = ad.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearchQuery;
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid className={clsx(styles.wrapper)} container spacing={0}>
        <div className={styles.container}>
          {adcategories && Array.isArray(adcategories.items) && (
            <>
              {isMobile ? (
                <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel>Категории</InputLabel>
                  <Select
                    value={selectedAdCategory}
                    onChange={(e) => {
                      setSelectedAdCategory(e.target.value);
                      setAdCategoryTitle(e.target.value || "Все объявления");
                    }}
                    label="Категории"
                  >
                    <MenuItem value="">Все объявления</MenuItem>
                    {adcategories.items.map((adcategory) => (
                      <MenuItem key={adcategory.id} value={adcategory.name}>
                        {adcategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <>
                  <div
                    className={clsx(styles.category, {
                      [styles.selected]: selectedAdCategory === "",
                    })}
                    onClick={() => {
                      setSelectedAdCategory("");
                      setAdCategoryTitle("Все объявления");
                    }}
                  >
                    Все объявления
                  </div>
                  {adcategories.items.map((adcategory) => (
                    <div
                      key={adcategory.id}
                      className={clsx(styles.category, {
                        [styles.selected]: selectedAdCategory === adcategory.name,
                      })}
                      onClick={() => {
                        setSelectedAdCategory(adcategory.name);
                        setAdCategoryTitle(adcategory.name);
                      }}
                    >
                      {adcategory.name}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
        <div className={clsx(styles.root)}>
          <h2 className={styles.news}>
            {adcategoryTitle}
            <TextField
              variant="outlined"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{ width: 200, marginLeft: 5, marginRight: 0, marginBottom: 1 }}
            />
          </h2>
          <div className={clsx(styles.scroll)}>
            {isAdLoading ? (
              <div><CircularProgress></CircularProgress></div>
            ) : (
              <Suspense fallback={<div></div>}>
                {(selectedAdCategory && !isLoadingAds) || !selectedAdCategory ? (
                  filteredAds
                    .sort(sortByFunction)
                    .slice(0, visibleAdsCount)
                    .map((obj, index) => (
                      <AllAds
                        key={obj._id}
                        id={obj._id}
                        title={obj.title}
                        imageUrls={obj.imageUrls.slice(0, 1)}
                        price={obj.price}
                        phone={obj.phone}
                        createdAt={obj.createdAt}
                        viewsCount={obj.viewsCount}
                        adcategory={obj.adcategory && obj.adcategory.name ? obj.adcategory.name : ""}
                        isEditable={userData && userData._id === obj.user._id}
                      />
                    ))
                ) : (
                  <Typography variant="h6" align="center">
                    Здесь пока нет объявлений
                  </Typography>
                )}
              </Suspense>
            )}
          </div>
          {visibleAdsCount < filteredAds.length && (
            <Button variant="contained" color="primary" onClick={handleShowMore} sx={{ mt: 2, mb: 2 }}>
              Показать еще
            </Button>
          )}
        </div>
        <div className={clsx(styles.widget)}>
          <SidereklamaList></SidereklamaList>
        </div>
</Grid>
</ThemeProvider>
);
};
