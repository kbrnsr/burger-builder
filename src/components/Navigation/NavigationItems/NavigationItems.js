import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = () => {
  const { NavigationItemsCSS } = classes;
  return (
    <ul
      className={NavigationItemsCSS}
    >
      <NavigationItem link="/" active>Burger Builder</NavigationItem>
      <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
