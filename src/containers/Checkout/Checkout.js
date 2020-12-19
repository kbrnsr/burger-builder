import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    const { history } = this.props;
    history.goBack();
  }

  checkoutContinuedHandler = () => {
    const { history } = this.props;
    history.replace('/checkout/contact-data');
  }

  render() {
    const { ingredients, purchased } = this.props;
    const { match } = this.props;
    const { path } = match;
    let summary = <Redirect to="/" />;
    if (Object.values(ingredients).length > 0) {
      const purchaseRedirect = purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            ingredients={ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={`${path}/contact-data`}
            component={ContactData}
          />
        </div>

      );
    }
    return summary;
  }
}

Checkout.propTypes = {
  ingredients: PropTypes.instanceOf(Object).isRequired,
  purchased: PropTypes.bool.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
