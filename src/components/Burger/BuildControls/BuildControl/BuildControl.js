import PropTypes from 'prop-types';
import classes from './BuildControl.module.css';

const BuildControl = (props) => {
  const {
    label, added, removed, disabled,
  } = props;
  const {
    Label, BuildControlCSS, Less, More,
  } = classes;
  return (
    <div className={BuildControlCSS}>
      <div className={Label}>
        {label}
      </div>
      <button
        onClick={removed}
        className={Less}
        type="button"
        disabled={disabled}
      >
        Less
      </button>
      <button
        onClick={added}
        className={More}
        type="button"
      >
        More
      </button>
    </div>
  );
};
BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired,
  removed: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default BuildControl;
