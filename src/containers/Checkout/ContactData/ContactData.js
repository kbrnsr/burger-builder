/* eslint-disable react/no-unused-state */
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Mail',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const { orderForm } = this.state;
    const {
      ingredients, price, onOrderBurger, token, userId,
    } = this.props;
    const formData = {};
    Object.entries(orderForm).map(([formElementIdentifier, formElement]) => {
      const { value } = formElement;
      formData[formElementIdentifier] = value;
      return value;
    });

    const burgerOrder = {
      ingredients,
      price,
      orderData: formData,
      userId,
    };
    onOrderBurger(burgerOrder, token);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const { orderForm } = this.state;

    const updatedFormElement = updateObject(orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value, orderForm[inputIdentifier].validation,
        ),
        touched: true,
      });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    Object.entries(updatedOrderForm).map(([formIdentifier, formValue]) => {
      formIsValid = (formValue.valid && formIsValid);
      return formIdentifier;
    });
    console.log('formisvalid', formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  }

  render() {
    const { orderForm, formIsValid } = this.state;
    const { loading } = this.props;
    const { ContactDataCSS } = classes;
    const formElementsArray = [];
    Object.entries(orderForm).map(([key, value]) => {
      formElementsArray.push({
        id: key,
        config: value,
      });
      return undefined;
    });
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => {
          const { config, id } = formElement;
          const {
            elementType, elementConfig, value, valid, validation, touched,
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
        })}
        <Button disabled={!formIsValid} clicked={() => console.log('clicked')} btnType="SuccessCSS">
          ORDER
        </Button>
      </form>
    );
    if (loading) {
      form = <Spinner />;
    }
    return (
      <div className={ContactDataCSS}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

ContactData.propTypes = {
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onOrderBurger: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
