// Хук для получения мета-данных текущего маршрута
import { useMatches } from "react-router-dom";
import type { AppRouteObject } from "./routes.config";

export const useRouteMeta = () => {
  const matches = useMatches();
  
  // Ищем мета-данные в совпадениях
  const match = matches[matches.length - 1];
  const route = match?.handle as AppRouteObject['meta'];
  
  return route;
};

// Использование:
// const meta = useRouteMeta();
// console.log(meta?.title); // "Главная"