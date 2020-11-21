import PropTypes from 'prop-types';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';

const Layout = (props) => {
  const { children } = props;
  const { MainContent } = classes;
  return (
    <Auxiliary>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={MainContent}>
        {children}
      </main>
    </Auxiliary>
  );
};
Layout.propTypes = { children: PropTypes.node };
Layout.defaultProps = { children: null };

export default Layout;
