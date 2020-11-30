import { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
    const fetchOrders = [];
    axios.get('/orders.json')
      .then((res) => {
        Object.entries(res.data).map(([key, value]) => {
          fetchOrders.push({
            ...value,
            id: key,
          });
          return key;
        });
        this.setState({
          loading: false,
          orders: fetchOrders,
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.error('{Orders} componentDidMount', err);
      });
  }

  render() {
    const { orders, loading } = this.state;
    console.log('loading: ', loading);
    let renderOrders = null;
    if (orders) {
      renderOrders = orders.map((order) => {
        const { id, ingredients, price } = order;
        return (
          <Order
            key={id}
            ingredients={ingredients}
            price={price}
          />
        );
      });
    }
    return (
      <div>
        {renderOrders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
