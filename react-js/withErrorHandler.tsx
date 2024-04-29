import React from "react";
import PASentry from "../../util/pa-sentry";

function _errorCallback(error: any) {
  console.error(error);
}

function FallBack() {
  return <span />;
}

/**
 * Will work on Production Mode only and on Client Side.
 * Error boundaries do not catch errors for:
 *  * Server side rendering i.e JUST FOR CSR
 *  * Event handlers (learn more)
 *  * Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
 *  * Errors thrown in the error boundary itself (rather than its children)
 */
function withErrorHandler(Component: any, FallbackComponent = FallBack, errorCallback = _errorCallback) {
  class WithErrorHandler extends React.Component {
    constructor(props: any) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: any, errorInfo: any) {
      // Update state if error happens
      this.setState({ error, errorInfo });
      PASentry.logException(error, errorInfo, this.props);
      // Report errors

      errorCallback(error, errorInfo, this.props);
    }

    render() {
      // if state contains error we render fallback component
      if (this.state.errorInfo) {
        return (
          <FallbackComponent
            {...this.props}
            error={this.state.error}
            errorInfo={this.state.errorInfo}
          />
        );
      }
      return <Component {...this.props} />;
    }
  }
  WithErrorHandler.displayName = `withErrorHandler(${Component.name})`;
  return WithErrorHandler;
}

export default withErrorHandler;
