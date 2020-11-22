import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

const Toolbar = () => {
  const { ToolbarCSS } = classes;
  return (
    <header className={ToolbarCSS}>
      <div>MENU</div>
      <Logo />
      <nav>
        ...
      </nav>
    </header>
  );
};

export default Toolbar;
