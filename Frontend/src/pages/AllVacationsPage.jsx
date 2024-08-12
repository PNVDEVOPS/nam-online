import React, { Suspense, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

import { fetchVacations } from "../redux/slices/vacations";
import { selectVacationCategories, fetchVacationCategories } from "../redux/slices/vacationcategories";
import { AllVacations } from "../components/AllVacations";
import SidereklamaList from "../components/Sidereklamalist";

import styles from "./AllVacationsPage.module.scss";

export const AllVacationsPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { vacations } = useSelector((state) => state.vacations);
  const vacationcategories = useSelector(selectVacationCategories);

  const isVacationLoading = vacations.status === "loading";

  const [selectedVacationCategory, setSelectedVacationCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [visibleVacationsCount, setVisibleVacationsCount] = useState(6);
  const [isLoadingVacations, setIsLoadingVacations] = useState(false);
  const [vacationcategoryTitle, setVacationCategoryTitle] = useState("Все объявления");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Track mobile/desktop

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "createdAt" || selectedValue === "viewsCount") {
      setSortBy(selectedValue);
    } else {
      setSelectedVacationCategory(selectedValue);
      setIsLoadingVacations(true);
      setVacationCategoryTitle(selectedValue);
    }
  };

  const loadVacationsByCategory = async () => {
    try {
      await dispatch(fetchVacations(selectedVacationCategory));
    } catch (error) {
      console.error("Error loading vacations:", error);
    } finally {
      setIsLoadingVacations(false);
    }
  };

  useEffect(() => {
    dispatch(fetchVacationCategories());
    dispatch(fetchVacations());
  }, [dispatch]);

  useEffect(() => {
    if (selectedVacationCategory) {
      loadVacationsByCategory();
    }
  }, [selectedVacationCategory]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleShowMore = () => {
    setVisibleVacationsCount((prevCount) => prevCount + 6);
  };

  const sortByFunction = (a, b) => {
    if (sortBy === "viewsCount") {
      return b.viewsCount - a.viewsCount;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  };

  const filteredVacations = vacations.items.filter((vacation) => {
    const matchesCategory = selectedVacationCategory
      ? vacation.vacationcategory && vacation.vacationcategory.name === selectedVacationCategory
      : true;
    const matchesSearchQuery = vacation.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearchQuery;
  });

  return (
    <>
      <Grid className={clsx(styles.wrapper)} container spacing={0}>
        <div className={styles.container}>
          {vacationcategories &&
            Array.isArray(vacationcategories.items) && (
              isMobile ? (
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Категории</InputLabel>
                  <Select
                    value={selectedVacationCategory}
                    onChange={(e) => {
                      setSelectedVacationCategory(e.target.value);
                      setVacationCategoryTitle(e.target.value || "Все объявления");
                    }}
                    label="Категории"
                  >
                    <MenuItem value="">Все объявления</MenuItem>
                    {vacationcategories.items.map((vacationcategory) => (
                      <MenuItem key={vacationcategory.id} value={vacationcategory.name}>
                        {vacationcategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <>
                  <div
                    className={clsx(styles.category, {
                      [styles.selected]: selectedVacationCategory === "",
                    })}
                    onClick={() => {
                      setSelectedVacationCategory("");
                      setVacationCategoryTitle("Все объявления");
                    }}
                  >
                    Все объявления
                  </div>
                  {vacationcategories.items.map((vacationcategory) => (
                    <div
                      key={vacationcategory.id}
                      className={clsx(styles.category, {
                        [styles.selected]: selectedVacationCategory === vacationcategory.name,
                      })}
                      onClick={() => {
                        setSelectedVacationCategory(vacationcategory.name);
                        setVacationCategoryTitle(vacationcategory.name);
                      }}
                    >
                      {vacationcategory.name}
                    </div>
                  ))}
                </>
              )
            )}
        </div>
        <div className={clsx(styles.root)}>
          <h2 className={styles.news}>
            {vacationcategoryTitle}
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
            {isVacationLoading ? (
              <div><CircularProgress /></div>
            ) : (
              <Suspense fallback={<div></div>}>
                {(selectedVacationCategory && !isLoadingVacations) || !selectedVacationCategory ? (
                  filteredVacations
                    .sort(sortByFunction)
                    .slice(0, visibleVacationsCount)
                    .map((obj) => (
                      <AllVacations
                        key={obj._id}
                        id={obj._id}
                        title={obj.title}
                        imageUrls={obj.imageUrls.slice(0, 1)}
                        price={obj.price}
                        phone={obj.phone}
                        mail={obj.mail}
                        createdAt={obj.createdAt}
                        viewsCount={obj.viewsCount}
                        vacationcategory={obj.vacationcategory && obj.vacationcategory.name ? obj.vacationcategory.name : ""}
                        isEditable={userData && userData._id === obj.user._id}
                      />
                    ))
                ) : (
                  <div></div>
                )}
              </Suspense>
            )}
          </div>
          {visibleVacationsCount < filteredVacations.length && (
            <Button variant="contained" color="primary" onClick={handleShowMore} sx={{ mt: 2, mb: 2 }}>
              Показать еще
            </Button>
          )}
        </div>
        <div className={clsx(styles.widget)}>
          <div className={clsx(styles.vacations)}>
            <SidereklamaList />
          </div>
        </div>
      </Grid>
    </>
  );
};

