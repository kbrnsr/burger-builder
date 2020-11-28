import { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  }

  componentDidMount() {
    const { location } = this.props;
    const { search } = location;
    const urlQuery = new URLSearchParams(search);
    const ingredients = {};
    urlQuery.forEach((value, key) => {
      ingredients[decodeURIComponent(key)] = parseInt(decodeURIComponent(value), 10);
    });
  }

  checkoutCancelledHandler = () => {
    const { history } = this.props;
    history.goBack();
  }

  checkoutContinuedHandler = () => {
    const { history } = this.props;
    history.replace('/checkout/contact-data');
  }

  render() {
    const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

export default Checkout;
