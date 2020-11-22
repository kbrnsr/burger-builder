import PropTypes from 'prop-types';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

const SideDrawer = (props) => {
  const { closed, open } = props;
  const {
    SideDrawerCSS, LogoCSS, OpenCSS, CloseCSS,
  } = classes;
  let attachedClasses = [SideDrawerCSS, CloseCSS];
  if (open) {
    attachedClasses = [SideDrawerCSS, OpenCSS];
  }
  return (
    <Auxiliary>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={LogoCSS}>
          <Logo />
        </div>

        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxiliary>
  );
};
SideDrawer.propTypes = {
  closed: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SideDrawer;
