import PropTypes from 'prop-types';
import { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // eslint-disable-next-line camelcase
  componentDidUpdate() {
    console.log('[OrderSummary] componentDidUpdate');
  }

  render() {
    const {
      ingredients, purchaseCancelled, purchaseContinued, price,
    } = this.props;
    const ingredientSummary = Object.keys(ingredients)
      .map((igKey) => (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
          {' '}
          {ingredients[igKey]}
        </li>
      ));
    return (
      <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>
          <strong>
            Total price
            {' '}
            {price.toFixed(2)}
          </strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button clicked={purchaseCancelled} btnType="DangerCSS">CANCEL</Button>
        <Button clicked={purchaseContinued} btnType="SuccessCSS">CONTINUE</Button>
      </Auxiliary>
    );
  }
}

OrderSummary.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ingredients: PropTypes.object.isRequired,
  purchaseCancelled: PropTypes.func.isRequired,
  purchaseContinued: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
};

export default OrderSummary;
