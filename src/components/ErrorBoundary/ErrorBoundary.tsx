import { Component, type ErrorInfo, type ReactNode } from 'react';

// Define the shape of the component's props
interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
}

// Define the shape of the component's internal state
interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  // Initialize the state
  public state: State = {
    hasError: false,
    error: null,
  };

  // Update state so the next render shows the fallback UI
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Catch errors in any components below and log them
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(
      'Uncaught error captured by ErrorBoundary:',
      error,
      errorInfo
    );
    // You can also log the error to an external service like Sentry or LogRocket here
  }

  // Method to clear the error state and try rendering the children again
  public handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  public render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // If a fallback prop is provided, check if it's a function or standard node
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(this.state.error, this.handleReset);
        }
        return this.props.fallback;
      }

      // Default fallback UI if no fallback prop is supplied
      return (
        <div
          style={{
            padding: '20px',
            border: '1px solid red',
            borderRadius: '5px',
          }}
        >
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
            {this.state.error.toString()}
          </details>
          <button
            onClick={this.handleReset}
            style={{ marginTop: '15px', padding: '8px 16px' }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
