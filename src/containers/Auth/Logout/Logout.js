import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../../../store/actions';

class Logout extends Component {
  componentDidMount() {
    const { onLogout } = this.props;
    onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actions.authLogout()),
});

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Logout);
