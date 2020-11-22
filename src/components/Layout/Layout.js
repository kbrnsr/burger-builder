import PropTypes from 'prop-types';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
  const { children } = props;
  const { MainContent } = classes;
  return (
    <Auxiliary>
      <Toolbar />
      <SideDrawer />
      <main className={MainContent}>
        {children}
      </main>
    </Auxiliary>
  );
};
Layout.propTypes = { children: PropTypes.node };
Layout.defaultProps = { children: null };

export default Layout;
