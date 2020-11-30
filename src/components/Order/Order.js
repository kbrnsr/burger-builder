import classes from './Order.module.css';

const Order = (props) => {
  const { price, ingredients } = props;
  const { OrderCSS } = classes;

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

export default Order;
