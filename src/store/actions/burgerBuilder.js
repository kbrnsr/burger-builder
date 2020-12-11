import * as aTypes from './actionTypes';
import axios from '../../axios-orders';

// eslint-disable-next-line import/prefer-default-export
export const addIngredient = (ingredientName) => ({
  type: aTypes.ADD_INGREDIENT,
  ingredientName,
});

// eslint-disable-next-line import/prefer-default-export
export const removeIngredient = (ingredientName) => ({
  type: aTypes.REMOVE_INGREDIENT,
  ingredientName,
});

export const setIngredients = (ingredients) => ({
  type: aTypes.SET_INGREDIENTS,
  ingredients,
});

export const fetchIngredientsFailed = () => ({
  type: aTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => (dispatch) => {
  axios.get('/ingredients.json')
    .then((res) => {
      dispatch(setIngredients(res.data));
    })
    .catch(() => { dispatch(fetchIngredientsFailed()); });
};
