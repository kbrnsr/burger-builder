import PropTypes from 'prop-types';
import classes from './Button.module.css';

const Button = (props) => {
  const {
    children, clicked, btnType, disabled,
  } = props;
  const { ButtonCSS } = classes;
  return (
    <button
      className={[ButtonCSS, classes[btnType]].join(' ')}
      type="submit"
      onClick={clicked}
      disabled={disabled}
    >
      {children}

    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  clicked: PropTypes.func.isRequired,
  btnType: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
Button.defaultProps = { disabled: false };

export default Button;
