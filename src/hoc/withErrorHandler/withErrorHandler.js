import { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    this.reqInterceptor = axios.interceptors.request.use((req) => {
      this.state.error = null;
      this.forceUpdate();
      return req;
    });
    this.resInterceptor = axios.interceptors.response.use((res) => res, (e) => {
      this.state.error = e;
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    axios.interceptors.request.eject(this.reqInterceptor);
    axios.interceptors.response.eject(this.resInterceptor);
  }

  errorConfirmHandler = () => {
    this.setState({ error: null });
  }

  render() {
    const { error } = this.state;
    return (
      <Auxiliary>
        <Modal
          show={!!error}
          modalClosed={this.errorConfirmHandler}
        >
          {error ? error.message : null}
        </Modal>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <WrappedComponent {...this.props} />
      </Auxiliary>
    );
  }
};

export default withErrorHandler;
