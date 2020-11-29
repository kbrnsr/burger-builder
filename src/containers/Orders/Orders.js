import { Component } from 'react';
import Order from '../../components/Order/Order';

// eslint-disable-next-line react/prefer-stateless-function
class Orders extends Component {
  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;
