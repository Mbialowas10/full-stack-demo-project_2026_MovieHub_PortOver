import React, { Component } from "react";
import type { ReactNode } from "react";


/**
 * Some Error Handling for app. This so the app doesn't crash and frustrate its users.
 * Acts as a try/catch for React Components
 */

// wrap components inside
interface Props {
  children: ReactNode;
}

// tracks if an error has occurred. 
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }

    return this.props.children;
  }
}
