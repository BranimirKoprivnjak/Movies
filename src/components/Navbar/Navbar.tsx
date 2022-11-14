import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Favorites from '../Favorites/Favorites';
import Button from '../UI/Button';
import Dropdown from '../UI/Dropdown';
import Input from '../UI/Input';
import MaterialIcon from '../UI/MaterialIcon';
import classes from './Navbar.module.css';

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleHamburgerClick = () => {
    setIsNavExpanded(prev => !prev);
  };

  return (
    <nav className={classes.nav}>
      <MaterialIcon
        type="menu"
        className={classes.hamburger}
        onClick={handleHamburgerClick}
      />
      <div className={isNavExpanded ? classes['show-menu'] : classes.menu}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${classes.active} ${classes.link}` : classes.link
          }
        >
          Discovery Page
        </NavLink>

        <div className={classes['search-wrapper']}>
          <div className={classes['icon-wrapper']}>
            <MaterialIcon type="search" className={classes['search-icon']} />
          </div>
          <Input
            type="text"
            placeholder="Search for movies..."
            className={classes.input}
          />
        </div>

        <Dropdown
          trigger={
            <Button className={classes.button}>
              My Favourites
              <MaterialIcon type="arrow_drop_down"></MaterialIcon>
            </Button>
          }
          shouldCloseImmediately={true}
          items={[<Favorites />]}
        />
      </div>
    </nav>
  );
};

export default Navbar;
