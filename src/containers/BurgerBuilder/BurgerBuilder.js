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
import * as aTypes from '../../store/actions';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    // Full link to ingredients.json
    /* axios.get('/ingredients.json')
      .then((res) => this.setState({
        ingredients: res.data,
      }))
      .catch(() => {
        this.setState({ error: true });
      }); */
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    const { ingredients, totalPrice } = this.state;
    const { history } = this.props;
    const queryParams = Object.entries(ingredients)
      .map(([key, value]) => `${key}=${value}`);
    queryParams.push(`price=${totalPrice}`);

    const queryString = encodeURI(queryParams.join('&'));

    history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    });
  }

  updatePurchaseState = (ingredients) => {
    const ingredientsCopy = { ...ingredients };
    const sum = Object.values(ingredientsCopy).reduce((reduceSum, el) => reduceSum + el, 0);
    this.setState({ purchasable: sum > 0 });
  }

  // add and remove ingredient
  // this.updatePurchaseState(updatedIngredients);

  render() {
    const {
      purchasable, purchasing, loading, error,
    } = this.state;

    const {
      ingredients, totalPrice, onAddIngredient, onRemoveIngredient,
    } = this.props;

    const disabledInfo = { ...ingredients };

    let orderSummary = null;
    let burger = error ? (
      <p style={{ textAlign: 'center' }}>
        Ingredients can&apos;t be loaded
      </p>
    ) : <Spinner />;

    if (ingredients) {
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
            purchasable={purchasable}
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
    if (loading) {
      orderSummary = (<Spinner />);
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
});
const mapDispatchToProps = (dispatch) => ({
  onAddIngredient: (ingredientName) => dispatch({
    type: aTypes.ADD_INGREDIENT,
    ingredientName,
  }),
  onRemoveIngredient: (ingredientName) => dispatch({
    type: aTypes.REMOVE_INGREDIENT,
    ingredientName,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
