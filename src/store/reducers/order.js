import * as aTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
};
const reducer = (state = initialState, action) => {
  const { orders } = state;
  const { type } = action;
  switch (type) {
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
        orders: orders.concat(newOrder),
      };
    case aTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
