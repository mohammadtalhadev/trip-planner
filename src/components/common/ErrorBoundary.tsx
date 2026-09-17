import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { hasError: boolean; message: string | null }

/** Catches unexpected render errors and shows a useful fallback instead of a blank page. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: null };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, message: error instanceof Error ? error.message : null };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-10 text-center">
        <span className="text-5xl">🧩</span>
        <h2 className="text-2xl font-extrabold text-on-surface">Something went wrong.</h2>
        <p className="max-w-md text-sm text-on-surface/60">We could not load this section. {this.state.message}</p>
        <button
          onClick={() => this.setState({ hasError: false, message: null })}
          className="cursor-pointer rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:brightness-110"
        >
          Try Again
        </button>
      </div>
    );
  }
}
