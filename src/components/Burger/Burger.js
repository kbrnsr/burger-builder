import PropTypes from 'prop-types';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
  const { ingredients } = props;
  const { BurgerView } = classes;
  const transformedIngredients = Object.keys(ingredients)
    .map((igKey) => [...Array(ingredients[igKey])]
      // eslint-disable-next-line react/no-array-index-key
      .map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />));
  return (
    <div className={BurgerView}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
Burger.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ingredients: PropTypes.object.isRequired,
};

export default Burger;
