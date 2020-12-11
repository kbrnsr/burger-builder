import * as aTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: [],
  totalPrice: 4,
  error: true,
};

const reducer = (state = initialState, action) => {
  const { ingredients, totalPrice } = state;
  const { type, ingredientName } = action;
  switch (type) {
    case aTypes.ADD_INGREDIENT:

      return {
        ...state,
        ingredients: {
          ...ingredients,
          [ingredientName]: ingredients[ingredientName] + 1,
        },
        totalPrice: totalPrice + INGREDIENT_PRICES[ingredientName],
      };
    case aTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...ingredients,
          [ingredientName]: ingredients[ingredientName] - 1,
        },
        totalPrice: totalPrice - INGREDIENT_PRICES[ingredientName],
      };
    case aTypes.SET_INGREDIENTS:
      // eslint-disable-next-line no-case-declarations
      const {
        salad, bacon, cheese, meat,
      } = action.ingredients;
      return {
        ...state,
        ingredients: {
          salad, bacon, cheese, meat,
        },
        error: false,
      };
    case aTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
