/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-props-no-spreading */
import classes from './Input.module.css';

const Input = (props) => {
  const {
    label, elementType, elementConfig, value, changed, invalid, shouldValidate, touched,
  } = props;
  const {
    InputCSS, LabelCSS, InputElementCSS, InvalidCSS,
  } = classes;

  let inputElement = null;
  const inputClasses = [InputElementCSS];

  if (invalid && shouldValidate && touched) {
    inputClasses.push(InvalidCSS);
  }

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          value={value}
          onChange={changed}
          className={inputClasses.join(' ')}
          {...elementConfig}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          value={value}
          onChange={changed}
          className={inputClasses.join(' ')}
          {...elementConfig}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          value={value}
          onChange={changed}
          className={inputClasses.join(' ')}
        >
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
          onChange={changed}
          className={inputClasses.join(' ')}
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
