/* eslint-disable no-case-declarations */
import * as aTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state) => updateObject(state, { purchased: false });
const puchaseBurgerStart = (state) => updateObject(state, { loading: true });

const purchaseBurgerSuccess = (action, state) => {
  const { orders, orderData, orderId: id } = action;
  const newOrder = updateObject(orderData, { id });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (state) => updateObject(state, { loading: false });
const fetchOrdersStart = (state) => updateObject(state, { loading: true });

const fetchOrdersSuccess = (state, action) => {
  const { orders } = action;
  return updateObject(state, {
    orders,
    loading: false,
  });
};

const fetchOrdersFail = (state) => updateObject(state, { loading: false });

const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case aTypes.PURCHASE_INIT: return purchaseInit(state);
    case aTypes.PURCHASE_BURGER_START: return puchaseBurgerStart(state);
    case aTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case aTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
    case aTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);
    case aTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case aTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);
    default: return state;
  }
};

export default reducer;
