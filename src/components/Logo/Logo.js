import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = () => {
  const { LogoCSS } = classes;
  return (
    <div className={LogoCSS}>
      <img alt="Burger Logo" src={burgerLogo} />
    </div>
  );
};
export default Logo;
