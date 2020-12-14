import * as aTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: aTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurgerFail = (error) => ({
  type: aTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurgerStart = () => ({
  type: aTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios.post('/orders.json', orderData)
    .then((res) => {
      console.log(res.data);
      dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    })
    .catch((e) => {
      dispatch(purchaseBurgerFail(e));
    });
};

export const purchaseInit = () => ({
  type: aTypes.PURCHASE_INIT,
});

export const fetchOrdersSuccess = (orders) => ({
  type: aTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFail = (error) => ({
  type: aTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const fetchOrdersStart = () => ({
  type: aTypes.FETCH_ORDERS_START,
});

export const fetchOrders = () => (dispatch) => {
  dispatch(fetchOrdersStart());
  axios.get('/orders.json')
    .then((res) => {
      const fetchedOrders = Object.entries(res.data)
        .map(([key, value]) => ({
          ...value,
          id: key,
        }));
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch((err) => {
      dispatch(fetchOrdersFail(err));
    });
};
