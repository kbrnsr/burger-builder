import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = (props) => {
  const { isAuthenticated } = props;
  const { NavigationItemsCSS } = classes;
  return (
    <ul
      className={NavigationItemsCSS}
    >
      <NavigationItem exact link="/">Burger Builder</NavigationItem>
      <NavigationItem exact={false} link="/orders">Orders</NavigationItem>
      { !isAuthenticated
        ? <NavigationItem exact={false} link="/auth">Authenticate</NavigationItem>
        : <NavigationItem exact={false} link="/logoout">Logout</NavigationItem>}
    </ul>
  );
};

export default NavigationItems;
