/* eslint-disable react/no-unused-state */
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
    axios.get('/orders.json')
      .then((res) => {
        const fetchOrders = [];
        Object.entries(res.data).map(([key, value]) => {
          fetchOrders.push({
            ...value,
            id: key,
          });
          return key;
        });
        this.setState({
          loading: false,
          order: fetchOrders,
        });
        console.log(fetchOrders);
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.error('{Orders} componentDidMount', err);
      });
  }

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
