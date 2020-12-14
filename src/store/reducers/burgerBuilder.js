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
  ingredients: null,
  totalPrice: 4,
  error: true,
};

const reducer = (state = initialState, action) => {
  const { ingredients, totalPrice } = state;
  const { type, ingredientName } = action;
  switch (type) {
    case aTypes.ADD_INGREDIENT:
      const addIngredient = { [ingredientName]: ingredients[ingredientName] + 1 };
      const addIngredients = updateObject(ingredients, addIngredient);
      const addIngredientsState = {
        ingredients: addIngredients,
        totalPrice: totalPrice + INGREDIENT_PRICES[ingredientName],
      };
      return updateObject(state, addIngredientsState);
    case aTypes.REMOVE_INGREDIENT:
      const updatedIngredient = { [ingredientName]: ingredients[ingredientName] - 1 };
      const updatedIngredients = updateObject(ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: totalPrice - INGREDIENT_PRICES[ingredientName],
      };
      return updateObject(state, updatedState);
    case aTypes.SET_INGREDIENTS:
      // eslint-disable-next-line no-case-declarations
      const {
        salad, bacon, cheese, meat,
      } = action.ingredients;
      return updateObject(state, {
        ingredients: {
          salad, bacon, cheese, meat,
        },
        totalPrice: 4,
        error: false,
      });
    case aTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
