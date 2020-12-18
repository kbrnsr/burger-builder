import PropTypes from 'prop-types';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
  const { ingredients } = props;
  const { BurgerView } = classes;
  let transformedIngredients = Object.keys(ingredients)
    .map((igKey) => [...Array(ingredients[igKey])]
      // eslint-disable-next-line react/no-array-index-key
      .map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />))
    .reduce((totalPrevious, current) => totalPrevious.concat(current), []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={BurgerView}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
Burger.propTypes = {
  ingredients: PropTypes.instanceOf(Object).isRequired,
};

export default Burger;
