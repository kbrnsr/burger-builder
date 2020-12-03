import * as aTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const reducer = (state = initialState, action) => {
  const { ingredients } = state;
  const { type, ingredientName } = action;
  switch (type) {
    case aTypes.ADD_INGREDIENT:

      return {
        ...state,
        ingredients: {
          ...ingredients,
          [ingredientName]: ingredients[ingredientName] + 1,
        },
      };
    case aTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...ingredients,
          [ingredientName]: ingredients[ingredientName] - 1,
        },
      };
    default:
      return state;
  }
};

export default reducer;
