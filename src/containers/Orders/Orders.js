import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    const { onFetchOrders, token, userId } = this.props;
    onFetchOrders(token, userId);
  }

  render() {
    const { orders, loading } = this.props;
    let renderOrders = <Spinner />;
    if (!loading) {
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

Orders.propTypes = {
  loading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  orders: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onFetchOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
