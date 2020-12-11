import * as aTypes from './actionTypes';

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
