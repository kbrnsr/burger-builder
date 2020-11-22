import PropTypes from 'prop-types';
import { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

class Modal extends Component {
  // This whole thing should be a functional component
  shouldComponentUpdate(nextProps) {
    const { show } = this.props;
    return nextProps.show !== show;
  }

  componentDidUpdate() {
  }

  render() {
    const { children, show, modalClosed } = this.props;
    const { ModalCSS } = classes;
    return (
      <Auxiliary>
        <Backdrop show={show} clicked={modalClosed} />
        <div
          className={ModalCSS}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0',
          }}
        >
          {children}
        </div>
      </Auxiliary>
    );
  }
}

Modal.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired,
};

export default Modal;
