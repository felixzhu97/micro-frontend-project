import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    font-size: ${({ theme }) => theme.typography.fontSize.medium};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    border: none;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }

  ul, ol {
    list-style: none;
    padding-left: ${({ theme }) => theme.spacing.medium};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  input, textarea, select {
    font: inherit;
    padding: ${({ theme }) => theme.spacing.small};
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default GlobalStyle;
