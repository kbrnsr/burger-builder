import PropTypes from 'prop-types';
import classes from './Order.module.css';

const Order = (props) => {
  const { price, ingredients } = props;
  const { OrderCSS } = classes;
  if (!ingredients) { return <p>Can&apos;t render order</p>; }
  const renderIngredients = Object.entries(ingredients)
    .map(([key, value]) => (
      <span
        key={key}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
      >
        {key}
        {' '}
        (
        {value}
        )
      </span>
    ));

  return (
    <div className={OrderCSS}>
      <p>
        Ingredients:
        {' '}
        {renderIngredients}
      </p>
      <p>
        Price:
        {' '}
        <strong>{price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

Order.propTypes = {
  price: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  ingredients: PropTypes.object.isRequired,

};

export default Order;
