import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    colors: {
      background: string;
      text: string;
      primary: string;
      secondary: string;
      error: string;
      success: string;
      warning: string;
      info: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
    borderRadius: {
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
  }
}
