import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
    };
  }

  componentDidMount() {
    console.log(this.props);
    const { onInitIngredients } = this.props;
    onInitIngredients();
  }

  purchaseHandler = () => {
    const { isAuthenticated, history, onSetAuthRedirectPath } = this.props;
    if (isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    const { history, onInitPurchase } = this.props;
    onInitPurchase();
    history.push('/checkout');
  }

  isPurchasable = (ingredients) => {
    const sum = Object.values(ingredients).reduce((reduceSum, el) => reduceSum + el, 0);
    return (sum > 0);
  }

  render() {
    const {
      purchasing,
    } = this.state;

    const {
      ingredients, totalPrice, error, onAddIngredient, onRemoveIngredient, isAuthenticated,
    } = this.props;

    const disabledInfo = { ...ingredients };

    let orderSummary = null;
    let burger = error ? (
      <p style={{ textAlign: 'center' }}>
        Ingredients can&apos;t be loaded
      </p>
    ) : <Spinner />;
    if (Object.values(ingredients).length > 0) {
      if (!error) {
        Object.keys(ingredients).map((ingredient) => {
          disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
          return null;
        });

        burger = (
          <Auxiliary>
            <Burger ingredients={ingredients} />
            <BuildControls
              ingredientAdded={onAddIngredient}
              ingredientRemoved={onRemoveIngredient}
              disabled={disabledInfo}
              price={totalPrice}
              purchasable={this.isPurchasable(ingredients)}
              ordered={this.purchaseHandler}
              isAuth={isAuthenticated}
            />
          </Auxiliary>
        );

        orderSummary = (
          <OrderSummary
            ingredients={ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={totalPrice}
          />
        );
      }
    }

    /*
      Really stupid way to do it
      Object.keys(ingredients).reduce((currentTotal, key) => {
      disabledInfo[key] = ingredients[key] <= 0;
      return currentTotal;
    }, {}); */

    return (
      <Auxiliary>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

BurgerBuilder.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onRemoveIngredient: PropTypes.func.isRequired,
  onAddIngredient: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  totalPrice: PropTypes.number.isRequired,
  ingredients: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired,
  onInitPurchase: PropTypes.func.isRequired,
  onSetAuthRedirectPath: PropTypes.func.isRequired,
  onInitIngredients: PropTypes.func.isRequired,
};
BurgerBuilder.defaultProps = {
  ingredients: {},
};

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== '',
});
const mapDispatchToProps = (dispatch) => ({
  onAddIngredient: (ingredientName) => dispatch(actions
    .addIngredient(ingredientName)),
  onRemoveIngredient: (ingredientName) => dispatch(actions
    .removeIngredient(ingredientName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
