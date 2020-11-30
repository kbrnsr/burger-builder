/* eslint-disable react/jsx-props-no-spreading */
import classes from './Input.module.css';

const Input = (props) => {
  const { label, inputtype } = props;
  const { InputCSS, LabelCSS, InputElementCSS } = classes;

  let inputElement = null;

  switch (inputtype) {
    case 'input':
      inputElement = <input className={InputElementCSS} {...props} />;
      break;
    case 'textarea':
      inputElement = <textarea className={InputElementCSS} {...props} />;
      break;
    default:
      inputElement = <input className={InputElementCSS} {...props} />;
  }

  return (
    <div className={InputCSS}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={LabelCSS}>{label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
