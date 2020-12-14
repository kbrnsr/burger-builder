import * as aTypes from '../actions/actionTypes';

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
      return {
        ...state,
        purchased: false,
      };
    case aTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case aTypes.PURCHASE_BURGER_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { orderData, orderId } = action;
      // eslint-disable-next-line no-case-declarations
      const newOrder = {
        ...orderData,
        orderId,
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: orders.concat(newOrder),
      };
    case aTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case aTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case aTypes.FETCH_ORDERS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { orders: actionOrders } = action;
      return {
        ...state,
        orders: actionOrders,
        loading: false,
      };
    case aTypes.FETCH_ORDERS_FAIL:
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
