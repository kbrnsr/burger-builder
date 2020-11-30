/* eslint-disable react/no-unused-state */
import { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    adress: {
      street: '',
      postalCode: '',
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
      customer: {
        name: 'Kbr Nsr',
        address: {
          street: 'Teststreet 1',
          zipCode: '124232',
          country: 'Wakanda',
        },
        email: 'test@test.com',
        deliveryMethod: 'fastest',
      },
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

  render() {
    const { loading } = this.state;
    const { ContactDataCSS } = classes;

    let form = (
      <form>
        <Input inputtype="Input" type="text" name="name" placeholder="Your Name" />
        <Input inputtype="Input" type="email" name="email" placeholder="Your Mail" />
        <Input inputtype="Input" type="text" name="street" placeholder="Street" />
        <Input inputtype="Input" type="text" name="postal" placeholder="Postal Code" />
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
