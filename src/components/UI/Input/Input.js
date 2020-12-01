/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-props-no-spreading */
import classes from './Input.module.css';

const Input = (props) => {
  const {
    label, elementType, elementConfig, value,
  } = props;
  const { InputCSS, LabelCSS, InputElementCSS } = classes;

  let inputElement = null;

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          value={value}
          className={InputElementCSS}
          {...elementConfig}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          value={value}
          className={InputElementCSS}
          {...elementConfig}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select>
          value=
          {value}
          className=
          {InputElementCSS}
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          value={value}
          className={InputElementCSS}
          {...elementConfig}
        />
      );
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
