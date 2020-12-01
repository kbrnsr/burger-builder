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
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Mail',
        },
        value: '',
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
    event.preventDefault();
    const { ingredients, price, history } = this.props;
    this.setState({ loading: true });

    const burgerOrder = {
      ingredients,
      price,
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
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
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
      <form>
        {formElementsArray.map((formElement) => {
          const { config, id } = formElement;
          const { elementType, elementConfig, value } = config;
          return (
            <Input
              key={id}
              label={id}
              elementType={elementType}
              elementConfig={elementConfig}
              value={value}
              changed={(event) => this.inputChangedHandler(event, id)}
            />
          );
        })}
        <Button clicked={this.orderHandler} btnType="SuccessCSS">ORDER</Button>
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
