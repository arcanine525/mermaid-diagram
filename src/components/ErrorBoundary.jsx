import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Error Boundary component to catch React errors
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        // Clear localStorage to reset state
        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-boundary-content">
                        <AlertTriangle size={48} />
                        <h2>Something went wrong</h2>
                        <p>The application encountered an unexpected error.</p>
                        {this.state.error && (
                            <pre className="error-boundary-details">
                                {this.state.error.toString()}
                            </pre>
                        )}
                        <button
                            className="error-boundary-btn"
                            onClick={this.handleReset}
                        >
                            <RefreshCw size={18} />
                            <span>Reload Application</span>
                        </button>
                    </div>

                    <style>{`
            .error-boundary {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              padding: 24px;
              background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
              color: #e0e0e0;
              font-family: 'Space Grotesk', sans-serif;
            }

            .error-boundary-content {
              text-align: center;
              max-width: 500px;
            }

            .error-boundary-content svg {
              color: #ef4444;
              margin-bottom: 16px;
            }

            .error-boundary-content h2 {
              font-size: 1.5rem;
              margin-bottom: 8px;
            }

            .error-boundary-content p {
              color: #94a3b8;
              margin-bottom: 16px;
            }

            .error-boundary-details {
              background: rgba(0, 0, 0, 0.3);
              padding: 12px;
              border-radius: 8px;
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.85rem;
              color: #ef4444;
              text-align: left;
              overflow-x: auto;
              margin-bottom: 24px;
            }

            .error-boundary-btn {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 12px 24px;
              background: linear-gradient(135deg, #06b6d4, #8b5cf6);
              border: none;
              border-radius: 10px;
              color: white;
              font-family: 'Space Grotesk', sans-serif;
              font-size: 1rem;
              font-weight: 500;
              cursor: pointer;
              transition: opacity 0.2s ease;
            }

            .error-boundary-btn:hover {
              opacity: 0.9;
            }
          `}</style>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
