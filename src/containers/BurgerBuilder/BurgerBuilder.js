import { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    // Full link to ingredients.json
    axios.get('/ingredients.json')
      .then((res) => this.setState({
        ingredients: res.data,
      }))
      .catch(() => {
        this.setState({ error: true });
      });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    const { ingredients, totalPrice } = this.state;
    // eslint-disable-next-line no-unused-vars
    const burgerOrder = {
      ingredients,
      price: totalPrice,
      customer: {
        name: 'Kbr Nsr',
        address: {
          street: 'Teststreet 1',
          zipCode: '124232',
          country: 'Wakanda',
        },
        email: 'test@test.com',
        deliveryMethod: 'fastest',
      },
    };
    this.setState({ loading: true });
    axios.post('/orders.json', burgerOrder)
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log('{BurgerBuilder postOrder}', res);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('BurgerBuilder postOrder error', e);
      })
      .finally(() => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      });
  }

  updatePurchaseState = (ingredients) => {
    const ingredientsCopy = { ...ingredients };
    const sum = Object.values(ingredientsCopy).reduce((reduceSum, el) => reduceSum + el, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;
    const updatedCount = ingredients[type] + 1;
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = updatedCount;
    const newPrice = totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = updatedCount;
    const newPrice = totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  }

  render() {
    const {
      ingredients, totalPrice, purchasable, purchasing, loading, error,
    } = this.state;
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
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
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

export default withErrorHandler(BurgerBuilder, axios);
