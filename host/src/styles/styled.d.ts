import "styled-components";
import { ReactNode, ComponentType } from "react";

declare module "styled-components" {
  export interface DefaultTheme extends Record<string, unknown> {
    mode: string;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      error: string;
      success: string;
      warning: string;
      info: string;
      border?: string;
      surface?: string;
      textSecondary?: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
    typography: {
      fontSize: {
        small: string;
        medium: string;
        large: string;
        xlarge: string;
      };
      fontWeight: {
        normal: number;
        medium: number;
        bold: number;
      };
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
    shadows?: {
      small?: string;
      medium?: string;
      large?: string;
    };
  }

  // Add proper typing for ThemeProvider to work with React 18
  export interface ThemeProviderProps<T extends DefaultTheme> {
    theme: T | ((outerTheme: T) => T);
    children?: ReactNode;
  }

  export const ThemeProvider: ComponentType<ThemeProviderProps<DefaultTheme>>;
}
