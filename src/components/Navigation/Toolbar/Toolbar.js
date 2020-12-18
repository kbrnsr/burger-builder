import PropTypes from 'prop-types';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {
  const { drawerToggleClicked, isAuth } = props;
  const { ToolbarCSS, LogoCSS, DesktopOnlyCSS } = classes;
  return (
    <header className={ToolbarCSS}>
      <DrawerToggle clicked={drawerToggleClicked} />
      <div className={LogoCSS}>
        <Logo />
      </div>
      <nav className={DesktopOnlyCSS}>
        <NavigationItems isAuthenticated={isAuth} />
      </nav>
    </header>
  );
};

Toolbar.propTypes = {
  drawerToggleClicked: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default Toolbar;
