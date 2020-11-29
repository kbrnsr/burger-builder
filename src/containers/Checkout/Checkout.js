import { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
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
    this.setState({ ingredients });
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
    const { match } = this.props;
    const { path } = match;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={`${path}/contact-data`} component={ContactData} />
      </div>
    );
  }
}

export default Checkout;
