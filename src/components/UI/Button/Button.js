import PropTypes from 'prop-types';
import classes from './Button.module.css';

const Button = (props) => {
  const { children, clicked, btnType } = props;
  const { ButtonCSS } = classes;
  return (
    <button
      className={[ButtonCSS, classes[btnType]].join(' ')}
      type="submit"
      onClick={clicked}
    >
      {children}

    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  clicked: PropTypes.func.isRequired,
  btnType: PropTypes.string.isRequired,
};

export default Button;
