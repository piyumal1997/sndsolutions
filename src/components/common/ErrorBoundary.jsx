// src/components/common/ErrorBoundary.jsx
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faHome } from '@fortawesome/free-solid-svg-icons';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    // Optional: Send to error tracking service (Sentry, LogRocket, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
          <div className="text-center max-w-lg">
            <FontAwesomeIcon 
              icon={faBug} 
              className="text-red-600 text-8xl md:text-9xl mb-6 animate-bounce" 
            />
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">Something Went Wrong</h1>
            <p className="text-xl text-gray-600 mb-8">
              We're sorry, an unexpected error occurred. Our team has been notified.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-full font-medium text-lg hover:bg-green-700 transition shadow-lg"
              >
                <FontAwesomeIcon icon={faHome} />
                Back to Home
              </Link>

              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-full font-medium text-lg hover:bg-green-50 transition"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;