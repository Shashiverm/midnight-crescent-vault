import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('crescent_wallet_session');
    } catch (e) {
      // ignore
    }
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#07090e',
          color: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            background: '#0e121b',
            border: '1px solid rgba(229, 169, 60, 0.3)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '20px',
              fontWeight: 700,
            }}>
              !
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '1.5rem',
              color: '#f3f4f6',
              marginBottom: '10px',
            }}>
              Session State Discrepancy
            </h2>
            <p style={{
              color: '#9ca3af',
              fontSize: '0.875rem',
              lineHeight: 1.5,
              marginBottom: '20px',
            }}>
              The application encountered an unexpected wallet payload. Click below to clear the cached session and reconnect smoothly.
            </p>
            {this.state.error?.message && (
              <pre style={{
                background: 'rgba(0, 0, 0, 0.4)',
                padding: '12px',
                borderRadius: '8px',
                color: '#fca5a5',
                fontSize: '0.75rem',
                textAlign: 'left',
                overflowX: 'auto',
                marginBottom: '20px',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {this.state.error.message}
              </pre>
            )}
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                background: '#e5a93c',
                color: '#07090e',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 24px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Reset Session &amp; Reconnect
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
