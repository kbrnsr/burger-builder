import PropTypes from 'prop-types';

const DrawerToggle = (props) => {
  const { clicked } = props;
  return (
    <button
      type="button"
      onClick={clicked}
    >
      MENU

    </button>
  );
};

DrawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default DrawerToggle;
