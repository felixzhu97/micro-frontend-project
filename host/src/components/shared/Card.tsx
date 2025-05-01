import React from "react";
import styled from "styled-components";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "outlined";
  className?: string;
}

const CardContainer = styled.div<{ variant: "default" | "outlined" }>`
  background-color: ${({ theme }) => theme.colors.background};
  border: ${({ theme, variant }) =>
    variant === "outlined" ? `1px solid ${theme.colors.secondary}` : "none"};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ variant }) =>
    variant === "default" ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none"};
  padding: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

export const Card: React.FC<CardProps> = ({
  title,
  children,
  variant = "default",
  className,
}) => {
  return (
    <CardContainer variant={variant} className={className}>
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

export default Card;
