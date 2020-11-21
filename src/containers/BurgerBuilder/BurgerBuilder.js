/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  render() {
    return (
      <Auxiliary>
        <Burger />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
