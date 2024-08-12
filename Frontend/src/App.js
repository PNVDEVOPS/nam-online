import Container from "@mui/material/Container";
import { Routes, Route } from 'react-router-dom';
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, FullAfisha, FullBanner, FullAd, AllPostsPage, AllAfishasPage, AllAdsPage, FullEvent, AllCafesPage, FullCafe, AddBanner, AddCafe, AddAds, AddEvent, AddAfisha, AdminPage, AddSidereklama, AllVacationsPage } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import React from "react";
import styles from "./index.scss";
import Footer from "./components/Footer/Footer";

import { AddTopreklama } from "./pages/AddTopreklama";
import TopreklamaList from "./components/Topreklamalist";
import AddImportantreklama from "./pages/AddImportantreklama copy";
import { AddVacations } from "./pages/AddVacations";
import { FullVacation } from "./pages/FullVacation";
import NotFound from "./components/NotFound/NotFound"; // Импортируйте компоненту NotFound
import AllImportantreklamaPage from "./pages/AllImportantReklamaPage";
import { AllContactsPage } from "./pages/AllContactsPage";
import { AddContact } from "./pages/AddContacts";
import { AllBusesPage } from "./pages/AllBusesPage";
import { AddBusPage } from "./pages/AddBus";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <Container className={styles.app} maxWidth="xl">
        <TopreklamaList />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/afishas/:id" element={<FullAfisha />} />
          <Route path="/events/:id" element={<FullEvent />} />
          <Route path="/events/:id/edit" element={<AddEvent />} />
          <Route path="/banners/:id" element={<FullBanner />} />
          <Route path="/banners/:id/edit" element={<AddBanner />} />
          <Route path="/ads/:id" element={<FullAd />} />
          <Route path="/ads/:id/edit" element={<AddAds />} />
          <Route path="/vacations/:id" element={<FullVacation />} />
          <Route path="/vacations/:id/edit" element={<AddVacations />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/afishas/:id/edit" element={<AddPost />} />
          <Route path="/allpostspage" element={<AllPostsPage />} />
          <Route path="/allafishaspage" element={<AllAfishasPage />} />
          <Route path="/alladspage" element={<AllAdsPage />} />
          <Route path="/allvacationspage" element={<AllVacationsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/allcafespage" element={<AllCafesPage />} />
          <Route path="/cafes/:id" element={<FullCafe />} />
          <Route path="/cafes/:id/edit" element={<AddCafe />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/add-afisha" element={<AddAfisha />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/add-ads" element={<AddAds />} />
          <Route path="/add-vacations" element={<AddVacations />} />
          <Route path="/add-cafe" element={<AddCafe />} />
          <Route path="/add-banner" element={<AddBanner />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/add-topreklama" element={<AddTopreklama />} />
          <Route path="/add-sidereklama" element={<AddSidereklama />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/add-importantreklama" element={<AddImportantreklama />} />
          <Route path="/allimportantreklamas" element={<AllImportantreklamaPage />} />
          <Route path="/allcontactspage" element={<AllContactsPage/>} />
          <Route path="/add-bus" element={<AddBusPage />} /> {/* Добавляем маршрут для страницы создания автобуса */}
          {/* <Route path="/buses/:id" element={<BusPage />} /> Добавляем маршрут для страницы просмотра автобуса */}
          <Route path="/buses" element={<AllBusesPage />} /> {/* Добавляем маршрут для страницы просмотра всех автобусов */}
          <Route path="*" element={<Home />} /> {/* Обработка несуществующих маршрутов */}
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
