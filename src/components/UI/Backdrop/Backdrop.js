import PropTypes from 'prop-types';
import classes from './Backdrop.module.css';

const Backdrop = (props) => {
  const { show, clicked } = props;
  const { BackdropCSS } = classes;
  return show ? (
    <button
      type="button"
      label="backdrop"
      className={BackdropCSS}
      onClick={clicked}
    />
  ) : null;
};
Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default Backdrop;
