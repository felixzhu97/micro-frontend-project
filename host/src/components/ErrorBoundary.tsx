import React, { Component, ErrorInfo, ReactNode } from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  padding: 20px;
  margin: 20px;
  border: 1px solid #dc3545;
  border-radius: 4px;
  background-color: #f8d7da;
  color: #721c24;
`;

const ErrorHeading = styled.h2`
  color: #dc3545;
  margin-bottom: 10px;
`;

const RetryButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("错误详情:", error);
    console.error("组件栈:", errorInfo.componentStack);
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorHeading>出错了！</ErrorHeading>
          <p>很抱歉，组件加载过程中发生错误。</p>
          {this.state.error && <p>错误信息: {this.state.error.message}</p>}
          <RetryButton onClick={this.handleRetry}>重试</RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
