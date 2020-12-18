import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {
  const { children, link, exact } = props;
  const { NavigationItemCSS, active } = classes;
  return (
    <li className={NavigationItemCSS}>
      <NavLink
        to={link}
        activeClassName={active}
        exact={exact}
      >
        {children}
      </NavLink>
    </li>
  );
};
NavigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
};

export default NavigationItem;
