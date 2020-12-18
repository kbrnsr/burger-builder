import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    const { building, authRedirectPath, onSetAuthRedirectPath } = this.props;
    if (!building && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const { controls } = this.state;
    const eventTargetValue = event.target.value;

    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: eventTargetValue,
        valid: this.checkValidity(eventTargetValue,
          controls[controlName].validation),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { onAuth } = this.props;
    const { controls, isSignup } = this.state;
    const { email, password } = controls;
    onAuth(email.value, password.value, isSignup);
  };

  switcAuthModeHandler = () => {
    this.setState((prevState) => ({ isSignup: !prevState.isSignup }));
  };

  render() {
    const { controls, isSignup } = this.state;
    const {
      loading, error, isAuthenticated, authRedirectPath,
    } = this.props;
    const { AuthCSS } = classes;
    const formElementsArray = Object.entries(controls)
      .map(([key, value]) => ({
        id: key,
        config: value,
      }));
    let form = formElementsArray.map((formElement) => {
      const { config, id } = formElement;
      const {
        elementType, elementConfig, value,
        valid, validation, touched,
      } = config;
      return (
        <Input
          key={id}
          label={id}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
          changed={(event) => this.inputChangedHandler(event, id)}
          invalid={!valid}
          shouldValidate={validation}
          touched={touched}
        />
      );
    });
    if (loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    if (error) {
      errorMessage = <p>{error.message}</p>;
    }
    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to={authRedirectPath} />;
    }
    return (
      <div className={AuthCSS}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button
            clicked={() => console.log('clicked')}
            btnType="SuccessCSS"
            disabled={false}
          >
            SUBMIT
          </Button>
        </form>
        <Button
          clicked={this.switcAuthModeHandler}
          btnType="DangerCSS"
        >
          SWITCH TO
          {' '}
          {isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

Auth.propTypes = {
  authRedirectPath: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  loading: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  onSetAuthRedirectPath: PropTypes.func.isRequired,
  building: PropTypes.bool.isRequired,
};

Auth.defaultProps = {
  error: false,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  building: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
