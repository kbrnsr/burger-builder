import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = () => {
  const { ToolbarCSS, LogoCSS, DesktopOnlyCSS } = classes;
  return (
    <header className={ToolbarCSS}>
      <div>MENU</div>
      <div className={LogoCSS}>
        <Logo />
      </div>
      <nav className={DesktopOnlyCSS}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
