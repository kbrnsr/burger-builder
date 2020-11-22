import PropTypes from 'prop-types';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
  const { ingredientAdded } = props;
  const { BuildControlsCSS } = classes;
  return (
    <div className={BuildControlsCSS}>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => ingredientAdded(ctrl.type)}
        />
      ))}
    </div>
  );
};
BuildControls.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
};

export default BuildControls;
