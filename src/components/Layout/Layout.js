import PropTypes from 'prop-types';
import Auxiliary from '../../hoc/Auxiliary';

const Layout = (props) => {
  const { children } = props;
  return (
    <Auxiliary>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main>
        {children}
      </main>
    </Auxiliary>
  );
};
Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;
