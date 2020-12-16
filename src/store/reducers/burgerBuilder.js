/* eslint-disable no-case-declarations */
import * as aTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: {},
  totalPrice: 4,
  error: true,
  building: false,
};

const addIngredient = (state, action) => {
  const { ingredients, totalPrice } = state;
  const { ingredientName } = action;
  const updateIngredient = { [ingredientName]: ingredients[ingredientName] + 1 };
  const updateIngredients = updateObject(ingredients, updateIngredient);

  const updatedState = {
    ingredients: updateIngredients,
    totalPrice: totalPrice + INGREDIENT_PRICES[ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const { ingredients, totalPrice } = state;
  const { ingredientName } = action;
  const updatedIngredient = { [ingredientName]: ingredients[ingredientName] - 1 };
  const updatedIngredients = updateObject(ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: totalPrice - INGREDIENT_PRICES[ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  const {
    salad, bacon, cheese, meat,
  } = action.ingredients;
  return updateObject(state, {
    ingredients: {
      salad, bacon, cheese, meat,
    },
    totalPrice: 4,
    error: false,
    building: false,
  });
};

const fetchIngredientsFailed = (state) => updateObject(state, { error: true });

const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case aTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case aTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case aTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case aTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
    default: return state;
  }
};

export default reducer;
