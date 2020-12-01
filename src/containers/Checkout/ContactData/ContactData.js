/* eslint-disable react/no-unused-state */
import { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{
            value: 'fastest',
            displayValue: 'Fastest',
          },
          {
            value: 'chapest',
            displayValue: 'Cheapest',
          },
          ],
        },
        value: '',
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    const { orderForm } = this.state;
    const { ingredients, price, history } = this.props;
    event.preventDefault();
    const formData = {};
    Object.entries(orderForm).map(([formElementIdentifier, formElement]) => {
      const { value } = formElement;
      formData[formElementIdentifier] = value;
      return value;
    });

    this.setState({ loading: true });

    const burgerOrder = {
      ingredients,
      price,
      orderData: formData,
    };
    axios.post('/orders.json', burgerOrder)
      .then((res) => {
        console.log('{BurgerBuilder postOrder}', res);
        this.setState({
          loading: false,
        });
        history.push('/');
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('BurgerBuilder postOrder error', e);
        this.setState({
          loading: false,
        });
      });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const { orderForm } = this.state;
    const updatedOrderForm = {
      ...orderForm,
    };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value, updatedFormElement.validation,
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);
    this.setState({ orderForm: updatedOrderForm });
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = (value.trim() !== '') && isValid;
    }
    if (rules.minLength) {
      isValid = (value.length >= rules.minLength) && isValid;
    }
    if (rules.maxLength) {
      isValid = (value.length <= rules.maxLength) && isValid;
    }
    return isValid;
  }

  render() {
    const { loading, orderForm } = this.state;
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
        <Button clicked={() => console.log('clicked')} btnType="SuccessCSS">ORDER</Button>
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

export default ContactData;
