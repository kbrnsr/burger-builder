import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = () => {
  const { NavigationItemsCSS } = classes;
  return (
    <ul
      className={NavigationItemsCSS}
    >
      <NavigationItem exact link="/">Burger Builder</NavigationItem>
      <NavigationItem exact={false} link="/orders">Orders</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
