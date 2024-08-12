import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { IoIosSearch } from 'react-icons/io';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GoTriangleDown } from "react-icons/go";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  const handleDrawerToggle = () => {
    if (window.innerWidth <= 768) {
      setMobileOpen(!mobileOpen);
    }
  };

  const menuItems = (
    <>
      <Link to="/allpostspage">
        <span className={styles.menu}>Новости</span>
      </Link>
      <Link to="/allafishaspage">
        <span className={styles.menu}>Афиша</span>
      </Link>
      <Link to="/alladspage">
        <span className={styles.menu}>Объявления</span>
      </Link>
      <Link to="/allcafespage">
        <span className={styles.menu}>Еда</span>
      </Link>
      <Link to="/allvacationspage">
        <span className={styles.menu}>Вакансии</span>
      </Link>
      <button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={styles.menu}
      >
        Еще
        <GoTriangleDown className={styles.triangle} />
      </button>
      <Menu
        className={styles.dropdown}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={styles.arrow} />
        <MenuItem onClick={handleClose} component={Link} to="/buses">
          Автобусы
        </MenuItem>
        {/* <MenuItem onClick={handleClose} component={Link} to="/allcontacts">
          Такси
        </MenuItem> */}
        <MenuItem onClick={handleClose} component={Link} to="/allimportantreklamas">
          Важные объявления
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/allcontactspage">
          Контакты и организации
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/">
          Реклама
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <div className={styles.root}>
      <Container maxWidth="xl">
        <div className={styles.inner}>
          <div className={styles.mainlogo}>
            <Link className={styles.logo} to="/" />
            <h1 className={styles.logoname}>МО «Намский улус»</h1>
          </div>
          <div className={styles.menuContainerDesktop}>{menuItems}</div>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link className={styles.exit} to="/admin">
                  Админ панель
                </Link>
                <button className={styles.exit} onClick={onClickLogout}>
                  Выйти
                </button>
              </>
            ) : (
              <>
      
              </>
            )}
          </div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Container>
      <Drawer
  anchor="left"
  open={mobileOpen}
  onClose={handleDrawerToggle}
  classes={{ paper: styles.drawerPaper }}
>
        <List className={styles.drawerList}>
          {menuItems}
        </List>
      </Drawer>
    </div>
  );
};
