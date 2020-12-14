/* eslint-disable no-case-declarations */
import * as aTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};
const reducer = (state = initialState, action) => {
  const { orders } = state;
  const { type } = action;
  switch (type) {
    case aTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    case aTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });
    case aTypes.PURCHASE_BURGER_SUCCESS:
      const { orderData, orderId } = action;
      const newOrder = updateObject(orderData, { orderId });
      return updateObject(state, {
        loading: false,
        purchased: true,
        orders: orders.concat(newOrder),
      });
    case aTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });
    case aTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
    case aTypes.FETCH_ORDERS_SUCCESS:
      const { orders: actionOrders } = action;
      return updateObject(state, {
        orders: actionOrders,
        loading: false,
      });
    case aTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false });
    default:
      return state;
  }
};

export default reducer;
