import * as aTypes from './actions';

const initialState = {
  ingredients: null,
  totalPrice: 4,
};

const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case aTypes.ADD_INGREDIENT:
    case aTypes.REMOVE_INGREDIENT:
    default:
      return state;
  }
};

export default reducer;
