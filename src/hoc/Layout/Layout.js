import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false,
    };
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));
  }

  render() {
    const { showSideDrawer } = this.state;
    const { children, isAuthenticated } = this.props;
    const { MainContent } = classes;
    return (
      <Auxiliary>
        <Toolbar
          isAuth={isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={isAuthenticated}
          open={showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={MainContent}>
          {children}
        </main>
      </Auxiliary>
    );
  }
}

Layout.propTypes = { children: PropTypes.node };
Layout.defaultProps = { children: null };

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps, null)(Layout);
