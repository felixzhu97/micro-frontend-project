import React from "react";
import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  size?: "small" | "medium" | "large";
}

const getButtonStyles = (variant: ButtonProps["variant"] = "primary") => {
  const colors = {
    primary: ({ theme }) => theme.colors.primary,
    secondary: ({ theme }) => theme.colors.secondary,
    success: ({ theme }) => theme.colors.success,
    danger: ({ theme }) => theme.colors.error,
    warning: ({ theme }) => theme.colors.warning,
    info: ({ theme }) => theme.colors.info,
  };

  return colors[variant];
};

const getButtonSize = (size: ButtonProps["size"] = "medium") => {
  const sizes = {
    small: ({ theme }) => theme.spacing.small,
    medium: ({ theme }) => theme.spacing.medium,
    large: ({ theme }) => theme.spacing.large,
  };

  return sizes[size];
};

const StyledButton = styled.button<ButtonProps>`
  padding: ${({ size }) => `${getButtonSize(size)} ${getButtonSize(size)}`};
  background-color: ${({ variant }) => getButtonStyles(variant)};
  color: #ffffff;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ size, theme }) =>
    size === "large"
      ? theme.typography.fontSize.large
      : size === "small"
      ? theme.typography.fontSize.small
      : theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
