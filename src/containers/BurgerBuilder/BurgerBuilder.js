/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 1,
        bacon: 1,
        cheese: 2,
        meat: 2,
      },
    };
  }

  render() {
    const { ingredients } = this.state;
    return (
      <Auxiliary>
        <Burger ingredients={ingredients} />
        <BuildControls />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
