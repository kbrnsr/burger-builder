import PropTypes from 'prop-types';
import classes from './BuildControl.module.css';

const BuildControl = (props) => {
  const { label } = props;
  const {
    Label, BuildControlCSS, Less, More,
  } = classes;
  return (
    <div className={BuildControlCSS}>
      <div className={Label}>
        {label}
      </div>
      <button className={Less} type="button">Less</button>
      <button className={More} type="button">More</button>
    </div>
  );
};
BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
};

export default BuildControl;
