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
  const {
    ingredientAdded, ingredientRemoved, disabled, price,
  } = props;
  const { BuildControlsCSS } = classes;
  return (
    <div className={BuildControlsCSS}>
      <p>
        Current price:
        {' '}
        <strong>{price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => ingredientAdded(ctrl.type)}
          removed={() => ingredientRemoved(ctrl.type)}
          disabled={disabled[ctrl.type]}
        />
      ))}
    </div>
  );
};
BuildControls.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  disabled: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
};

export default BuildControls;
