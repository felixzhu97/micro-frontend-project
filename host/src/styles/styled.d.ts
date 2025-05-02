import "styled-components";
import { ReactNode, ComponentType } from "react";

declare module "styled-components" {
  export interface DefaultTheme extends Record<string, unknown> {
    // This empty interface declaration helps with type inference
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      border: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
    typography: {
      fontWeight: {
        regular: number;
        medium: number;
        bold: number;
      };
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
  }

  // Add proper typing for ThemeProvider to work with React 18
  export interface ThemeProviderProps<T extends DefaultTheme> {
    theme: T | ((outerTheme: T) => T);
    children?: ReactNode;
  }

  export const ThemeProvider: ComponentType<ThemeProviderProps<DefaultTheme>>;
}
