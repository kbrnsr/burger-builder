import { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 0,
    };

    const { location } = props;
    const { search } = location;
    const urlQuery = new URLSearchParams(search);
    const ingredients = {};
    let price = 0;

    urlQuery.forEach((value, key) => {
      if (decodeURIComponent(key) === 'price') {
        price = parseInt(decodeURIComponent(value), 10);
      } else {
        ingredients[decodeURIComponent(key)] = parseInt(decodeURIComponent(value), 10);
      }
    });
    this.state = { ingredients, totalPrice: price };
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
    const { ingredients, totalPrice } = this.state;
    const { match } = this.props;
    const { path } = match;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${path}/contact-data`}
          render={(props) => {
            const { history } = props;
            return (
              <ContactData
                ingredients={ingredients}
                price={totalPrice}
                history={history}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default Checkout;
