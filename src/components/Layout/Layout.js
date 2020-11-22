import PropTypes from 'prop-types';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = (props) => {
  const { children } = props;
  const { MainContent } = classes;
  return (
    <Auxiliary>
      <Toolbar />
      <main className={MainContent}>
        {children}
      </main>
    </Auxiliary>
  );
};
Layout.propTypes = { children: PropTypes.node };
Layout.defaultProps = { children: null };

export default Layout;
