
import clsx from 'clsx';
import styles from './Footer.module.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Share } from '../SharePage/Share';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.root}>
      <div className={styles.column}>
        <div className={styles.logoroot}>
        <div className={styles.logo}></div><div className={styles.logoname}>МО «Намский улус»</div>
        </div>
      </div>
      <div className={styles.column}>
        <h3>Главная</h3>
        <p><Link className={styles.link} to="/allpostspage">Новости</Link></p>
        <p><Link className={styles.link} to="/allafishaspage">Афиша</Link></p>
        <p><Link className={styles.link} to="/alladspage">Услуги</Link></p>
        <p><Link className={styles.link} to="/allcafespage">Еда</Link></p>
      </div>
      <div className={styles.column}>
        <h3>Информация</h3>
        <p><Link className={styles.link} to="/allvacationspage">Вакансии</Link></p>
        <p><Link className={styles.link} to="/allimportantreklamas">Объявления</Link></p>
        <p><Link className={styles.link} to="/allcontactspage">Организации</Link></p>
        <p><Link className={styles.link} to="/buses">Расписание</Link></p>
      </div>
      <div className={styles.column}>
        <h3>Контакты</h3>
        <p>a.borealisdev@yandex.ru</p>
        <p>+79252493350</p>
      </div>
      <div className={styles.column}>
        <h3>СОЦСЕТИ</h3>
        {/* Ваши ссылки на социальные сети здесь */}
     
      </div>
      </div>
    </footer>
  );
};

export default Footer;

