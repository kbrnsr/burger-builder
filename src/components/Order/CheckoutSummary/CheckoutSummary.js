import PropTypes from 'prop-types';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  const { ingredients, checkoutCancelled, checkoutContinued } = props;
  const { CheckoutSummaryCSS } = classes;
  return (
    <div className={CheckoutSummaryCSS}>
      <h1>We hopes it tastes well</h1>
      <div style={{
        width: '100%',
        margin: 'auto',
      }}
      >
        <Burger ingredients={ingredients} />
      </div>
      <Button
        clicked={checkoutCancelled}
        btnType="DangerCSS"
      >
        CANCEL
      </Button>
      <Button
        clicked={checkoutContinued}
        btnType="SuccessCSS"
      >
        CONTINUE
      </Button>
    </div>
  );
};
CheckoutSummary.propTypes = {
  ingredients: PropTypes.instanceOf(Object).isRequired,
  checkoutCancelled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
};

export default CheckoutSummary;
