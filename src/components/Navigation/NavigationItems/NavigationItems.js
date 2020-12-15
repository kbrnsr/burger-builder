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
      { isAuthenticated
        ? <NavigationItem exact={false} link="/orders">Orders</NavigationItem>
        : null}
      { !isAuthenticated
        ? <NavigationItem exact={false} link="/auth">Authenticate</NavigationItem>
        : <NavigationItem exact={false} link="/logout">Logout</NavigationItem>}
    </ul>
  );
};

export default NavigationItems;
