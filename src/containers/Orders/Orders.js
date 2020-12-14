import { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    const { onFetchOrders } = this.props;
    onFetchOrders();
  }

  render() {
    const { orders, loading } = this.props;
    console.log('{Orders} loading: ', loading);
    let renderOrders = <Spinner />;
    if (!loading) {
      if (orders !== undefined) {
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
    }
    return (
      <div>
        {renderOrders}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: () => dispatch(actions.fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
