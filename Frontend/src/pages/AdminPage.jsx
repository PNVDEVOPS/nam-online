import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, useLocation } from 'react-router-dom';
import { AddAds } from './AddAds';
import { AddAfisha } from './AddAfisha';
import { AddBanner } from './AddBanner';
import { AddCafe } from './AddCafe';
import { AddEvent } from './AddEvent';
import { AddPost } from './AddPost';
import styles from './AdminPage.module.scss';

// Главный компонент админ панели
export const AdminPage = () => {
  const location = useLocation();

  return (
    <div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/add-ads" className={location.pathname === '/add-ads' ? styles.active : ''}>Добавить Объявление</Link>
          </li>
          <li>
            <Link to="/add-afisha" className={location.pathname === '/add-afisha' ? styles.active : ''}>Добавить Кино</Link>
          </li>
          <li>
            <Link to="/add-banner" className={location.pathname === '/add-banner' ? styles.active : ''}>Добавить Слайдер-Баннер</Link>
          </li>
          <li>
            <Link to="/add-cafe" className={location.pathname === '/add-cafe' ? styles.active : ''}>Добавить Кафе</Link>
          </li>
          <li>
            <Link to="/add-event" className={location.pathname === '/add-event' ? styles.active : ''}>Добавить Афишу</Link>
          </li>
          <li>
            <Link to="/add-post" className={location.pathname === '/add-post' ? styles.active : ''}>Добавить Пост</Link>
          </li>
          <li>
            <Link to="/add-topreklama" className={location.pathname === '/add-topreklama' ? styles.active : ''}>Добавить Топ-Баннер</Link>
          </li>
          <li>
            <Link to="/add-sidereklama" className={location.pathname === '/add-sidereklama' ? styles.active : ''}>Добавить Сайд-Баннер</Link>
          </li>
          <li>
            <Link to="/add-importantreklama" className={location.pathname === '/add-importantreklama' ? styles.active : ''}>Добавить Важное-объявление</Link>
          </li>
          <li>
            <Link to="/add-vacations" className={location.pathname === '/add-vacations' ? styles.active : ''}>Добавить Вакансию</Link>
          </li>
          <li>
            <Link to="/add-contact" className={location.pathname === '/add-contact' ? styles.active : ''}>Добавить Организацию</Link>
          </li>
          <li>
            <Link to="/add-bus" className={location.pathname === '/add-bus' ? styles.active : ''}>Добавить Расписание Автобуса</Link>
          </li>
        </ul>
      </nav>

      {/* <Switch>
        <Route path="/admin/add-ads">
          <AddAds />
        </Route>
        <Route path="/admin/add-afisha">
          <AddAfisha />
        </Route>
        <Route path="/admin/add-banner">
          <AddBanner />
        </Route>
        <Route path="/admin/add-cafe">
          <AddCafe />
        </Route>
        <Route path="/admin/add-event">
          <AddEvent />
        </Route>
        <Route path="/admin/add-post">
          <AddPost />
        </Route>
      </Switch> */}
    </div>
  );
}
