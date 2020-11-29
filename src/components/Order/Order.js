import classes from './Order.module.css';

const Order = () => {
  const { OrderCSS } = classes;
  return (
    <div className={OrderCSS}>
      <p>Ingredients: salad 1</p>
      <p>
        Price:
        {' '}
        <strong>USD 5.45</strong>
      </p>
    </div>
  );
};

export default Order;
