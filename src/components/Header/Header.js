import React from 'react';
import Logo from '../../asset/img/Logo.svg';
import { Link } from 'react-router-dom';
import classes from './Header.module.scss';
import Menu from '@mui/icons-material/Menu';
import { useLocation, useMatch } from 'react-router-dom';
function Header(props) {
  const navItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Pokédex',
      path: '/Pokedex',
    },
    {
      name: 'Legendaries',
      path: '/Legendaries',
    },
    {
      name: 'Documentation',
      path: '/Documentation',
    },
  ];

  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.container}>
          <Link to="/" className={classes.logo}>
            <img src={Logo} alt="logo" />
          </Link>

          <ul className={classes.nav}>
            {navItems.map(navItem => {
              return (
                <li key={navItem.name}>
                  <Link to={navItem.path} className={classes.nav__link}>
                    {navItem.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={classes.hamburger}>
            <Menu className={classes.icon} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
