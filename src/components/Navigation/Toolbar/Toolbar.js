// import PropTypes from 'prop-types';
import classes from './Toolbar.module.css';

const Toolbar = () => {
  const { ToolbarCSS } = classes;
  return (
    <header className={ToolbarCSS}>
      <div>MENU</div>
      <div>LOGO</div>
      <nav>
        ...
      </nav>
    </header>
  );
};

export default Toolbar;
