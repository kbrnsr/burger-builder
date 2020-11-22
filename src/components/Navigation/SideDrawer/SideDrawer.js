import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const SideDrawer = () => {
  const { SideDrawerCSS, LogoCSS } = classes;
  return (
    <div className={SideDrawerCSS}>
      <div className={LogoCSS}>
        <Logo />
      </div>

      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default SideDrawer;
