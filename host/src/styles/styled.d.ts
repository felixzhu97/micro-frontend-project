import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
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
}
