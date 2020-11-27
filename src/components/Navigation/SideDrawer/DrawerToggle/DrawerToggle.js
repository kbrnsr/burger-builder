import PropTypes from 'prop-types';
import classes from './DrawerToggle.module.css';

const DrawerToggle = (props) => {
  const { clicked } = props;
  const { DrawerToggleCSS } = classes;

  return (
    <div
      className={DrawerToggleCSS}
      role="presentation"
      onClick={clicked}
    >
      <div />
      <div />
      <div />
    </div>
  );
};

DrawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default DrawerToggle;
