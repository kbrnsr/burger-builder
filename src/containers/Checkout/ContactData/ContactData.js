/* eslint-disable react/no-unused-state */
import { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    adress: {
      street: '',
      postalCode: '',
    },
  };

  render() {
    const { ContactDataCSS, InputCSS } = classes;
    return (
      <div className={ContactDataCSS}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input className={InputCSS} type="text" name="name" placeholder="Your Name" />
          <input className={InputCSS} type="email" name="email" placeholder="Your Mail" />
          <input className={InputCSS} type="text" name="street" placeholder="Street" />
          <input className={InputCSS} type="text" name="postal" placeholder="Postal Code" />
          <Button btnType="SuccessCSS">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
