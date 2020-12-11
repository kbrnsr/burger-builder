import { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuiderActions from '../../store/actions';

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
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    const { history } = this.props;

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
      ingredients, totalPrice, error, onAddIngredient, onRemoveIngredient,
    } = this.props;

    const disabledInfo = { ...ingredients };

    let orderSummary = null;
    let burger = error ? (
      <p style={{ textAlign: 'center' }}>
        Ingredients can&apos;t be loaded
      </p>
    ) : <Spinner />;

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

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
  error: state.error,
});
const mapDispatchToProps = (dispatch) => ({
  onAddIngredient: (ingredientName) => dispatch(burgerBuiderActions
    .addIngredient(ingredientName)),
  onRemoveIngredient: (ingredientName) => dispatch(burgerBuiderActions
    .removeIngredient(ingredientName)),
  onInitIngredients: () => dispatch(burgerBuiderActions.initIngredients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
