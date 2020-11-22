import PropTypes from 'prop-types';
import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {
  const { children, link, active } = props;
  const { NavigationItemCSS, active: activeCSS } = classes;
  return (
    <li className={NavigationItemCSS}>
      <a
        href={link}
        className={active ? activeCSS : null}
      >
        {children}
      </a>
    </li>
  );
};
NavigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  active: PropTypes.bool,
};
NavigationItem.defaultProps = {
  active: false,
};

export default NavigationItem;
