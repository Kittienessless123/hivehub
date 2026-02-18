import {
  createRoutesFromElements,
  createHashRouter,
  Route,
  RouterProvider,
  useLocation,
  Navigate,
  Routes,
} from "react-router-dom";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";

import { useThemeMode } from "../styles/useThemeMode.ts";

export const AppRouter = () => {
  const { theme } = useThemeMode();


  const routers = createRoutesFromElements(
   /*  <Route path="/" >
    </Route> */
  );

  const router = createHashRouter(routers, {});

  return (
    <div className={clsx("app", theme)}>
      <RouterProvider router={router} />
    </div>
  );
};