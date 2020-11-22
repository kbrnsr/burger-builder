import PropTypes from 'prop-types';
import classes from './Modal.module.css';

const Modal = (props) => {
  const { children } = props;
  const { ModalCSS } = classes;
  return (
    <div className={ModalCSS}>
      {children}
    </div>
  );
};
Modal.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};

export default Modal;
