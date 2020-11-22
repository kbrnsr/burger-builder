import PropTypes from 'prop-types';
import classes from './BuildControl.module.css';

const BuildControl = (props) => {
  const { label, added } = props;
  const {
    Label, BuildControlCSS, Less, More,
  } = classes;
  return (
    <div className={BuildControlCSS}>
      <div className={Label}>
        {label}
      </div>
      <button className={Less} type="button">Less</button>
      <button onClick={added} className={More} type="button">More</button>
    </div>
  );
};
BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired,
};

export default BuildControl;
