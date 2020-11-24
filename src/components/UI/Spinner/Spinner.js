import classes from './Spinner.module.css';

const Spinner = () => {
  const { LoaderCSS } = classes;
  return <div className={LoaderCSS}>Loading...</div>;
};

export default Spinner;
