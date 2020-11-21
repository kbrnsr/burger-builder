import classes from './BurgerIngredient.module.css';

const BurgerIngredient = (props) => {
  let ingredient = null;
  const {
    BreadBottom, BreadTop, Seeds1, Seeds2, Meat, Cheese, Salad, Bacon,
  } = classes;
  const { type } = props;

  switch (type) {
    case 'bread-bottom':
      ingredient = <div className={BreadBottom} />;
      break;
    case 'bread-top':
      ingredient = (
        <div className={BreadTop}>
          <div className={Seeds1} />
          <div className={Seeds2} />
        </div>
      );
      break;
    case 'meat':
      ingredient = (<div className={Meat} />);
      break;
    case 'cheese':
      ingredient = (<div className={Cheese} />);
      break;
    case 'salad':
      ingredient = (<div className={Salad} />);
      break;
    case 'bacon':
      ingredient = (<div className={Bacon} />);
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

export default BurgerIngredient;
