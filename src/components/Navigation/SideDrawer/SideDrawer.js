import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const SideDrawer = () => {
  const { SideDrawerCSS } = classes;
  return (
    <div className={SideDrawerCSS}>
      <Logo />
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default SideDrawer;
