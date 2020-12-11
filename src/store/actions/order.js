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
      dispatch(purchaseBurgerSuccess(res.data, orderData));
    })
    .catch((e) => {
      dispatch(purchaseBurgerFail(e));
    });
};
