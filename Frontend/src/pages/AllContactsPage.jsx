import React, { useEffect, useState, Suspense } from "react";
import Grid from "@mui/material/Grid";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, TextField } from "@mui/material";

import { fetchContacts } from "../redux/slices/contacts";
import { Contact } from "../components/Contact";
import styles from "./AllContactsPage.module.scss";
import SidereklamaList from "../components/Sidereklamalist";

export const AllContactsPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { contacts } = useSelector((state) => state.contacts);

  const isContactLoading = contacts.status === "loading";
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [visibleContactsCount, setVisibleContactsCount] = useState(6);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleShowMore = () => {
    setVisibleContactsCount((prevCount) => prevCount + 6);
  };

  const sortByFunction = (a, b) => {
    if (sortBy === "viewsCount") {
      return b.viewsCount - a.viewsCount;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  };

  const filteredContacts = contacts.items.filter((contact) =>
    contact.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Grid className={clsx(styles.wrapper)} container spacing={0}>
        <div className={clsx(styles.root)}>
          <h2 className={styles.news}>
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
            {isContactLoading ? (
              <div className={styles.loadingContainer}>
              <CircularProgress />
            </div>
            ) : (
              <Suspense fallback={<div className={styles.loadingContainer}>
              <CircularProgress />
            </div>}>
                {filteredContacts
                  .sort(sortByFunction)
                  .slice(0, visibleContactsCount)
                  .map((obj) => (
                    <Contact
                      key={obj._id}
                      id={obj._id}
                      title={obj.title}
                      text={obj.text}
                      imageUrl={obj.imageUrl}
                      phone={obj.phone}
                      secondphone={obj.secondphone}
                      mail={obj.mail}
                      createdAt={obj.createdAt}
                      isEditable={userData && userData._id === obj.user._id}
                    />
                  ))}
              </Suspense>
            )}
          </div>
          {visibleContactsCount < filteredContacts.length && (
                 <Button variant="contained" color="primary" onClick={handleShowMore} sx={{ mt: 2, mb: 2 }}>
                 Показать еще
               </Button>
          )}
        </div>
        <div className={clsx(styles.widget)}>
      
      <SidereklamaList />
    
  </div>
      </Grid>
    
    </>
  );
};
