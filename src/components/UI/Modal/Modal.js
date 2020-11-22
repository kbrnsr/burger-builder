import PropTypes from 'prop-types';
import classes from './Modal.module.css';

const Modal = (props) => {
  const { children, show } = props;
  const { ModalCSS } = classes;
  return (
    <div
      className={ModalCSS}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      {children}
    </div>
  );
};
Modal.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  show: PropTypes.bool.isRequired,
};

export default Modal;
