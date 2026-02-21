import {
  createRoutesFromElements,
  createHashRouter,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { useThemeMode } from "../styles/useThemeMode.ts";
import { DemoPage } from "pages/demo-page/DemoPage.tsx";
import { Layout } from "app/layout/Layout.tsx";
import { lightTheme, darkTheme } from "../styles/themes.ts";
import {GlobalStyles} from "../styles/global.ts";

const AppContainer = styled.div`
  
  background-color: white;
  color: black;
  transition: background-color 0.2s ease, color 0.2s ease;
`;

export const AppRouter = () => {
  const { theme } = useThemeMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const routers = createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="demo" element={<DemoPage />} />
      <Route index element={<Navigate to="/demo" replace />} />
    </Route>
  );

  const router = createHashRouter(routers, {});

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <AppContainer>
        <RouterProvider router={router} />
      </AppContainer>
    </ThemeProvider>
  );
};