import { createHashRouter, RouterProvider } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { useThemeMode } from "../styles/useThemeMode.ts";
import { Layout } from "app/layout/Layout.tsx";
import { lightTheme, darkTheme } from "../styles/themes.ts";
import { GlobalStyles } from "../styles/global.ts";
import { Fallback } from "shared/ui/Fallback/index.tsx";
import { routeChildren } from "shared/types/routes.types.tsx";
const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.components.background.primary};
  color: ${({ theme }) => theme.components.text.primary};
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  min-height: 100vh;
`;

export const AppRouter = () => {
  const { theme } = useThemeMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Fallback />,
      children: routeChildren,
    },
  ]);

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <AppContainer>
        <RouterProvider router={router} />
      </AppContainer>
    </ThemeProvider>
  );
};
