import { type FC, type JSX } from "react";
import { ThemeProviderWrapper as ThemeProvider } from "../styles/ThemeContext.ts";


interface IProviders {
  /** Content that will be wrapped by providers. */
  readonly children: JSX.Element;
}

export const Providers: FC<IProviders> = ({ children }) => {
  return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
  );
};