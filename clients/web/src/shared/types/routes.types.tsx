import { ProtectedRoute, RedirectIfAuthenticated } from 'app/routing/ProtectedRoute.tsx';
import { DashboardPage } from 'pages/analytics/dashboard';
import { ForgotPasswordPage } from 'pages/auth/forgot-password';
import { ResetPasswordPage } from 'pages/auth/forgot-password/ResetPassword';
import { LoginPage } from 'pages/auth/login';
import { RegisterPage } from 'pages/auth/register';
import { DemoPage } from 'pages/demo-page/DemoPage';
import { HomePage } from 'pages/home/authenticated/HomePage';
import { ChatDetailPage } from 'pages/messenger/chat-detail';
import { OrderListPage } from 'pages/orders/list';
import { PortfolioPage } from 'pages/portfolio';
import { ProfileMePage } from 'pages/profile/me';
import { SettingsPage } from 'pages/profile/settings';
import { UserViewPage } from 'pages/profile/user-view';
import { ProjectsDetailPage } from 'pages/projects/detail';
import { ProjectKanbanPage } from 'pages/projects/kanban';
import { Fallback } from 'shared/ui/Fallback';
import { type RouteObject } from 'react-router-dom';

export type RoutePath =
  | "/"
  | "/login"
  | "/register"
  | "/forgot-password"
  | "/reset-password"
  | "/messenger"
  | "/profile"
  | "/me"
  | "/orders"
  | "/projects"
  | "/portfolio"
  | "/notes"
  | "/analytics"
  | "/settings"
  | "/demo";

export type RouteName =
  | "home"
  | "login"
  | "register"
  | "forgotPassword"
  | "resetPassword"
  | "messenger"
  | "profile"
  | "me"
  | "orders"
  | "projects"
  | "portfolio"
  | "notes"
  | "analytics"
  | "settings"
  | "demo";

export interface RouteConfig {
  path: RoutePath;
  name: RouteName;
  title?: string;
  requiresAuth?: boolean;
  redirectIfAuth?: boolean;
  roles?: Array<"user" | "admin" | "moderator">;
}

export const ROUTES: Record<RouteName, RouteConfig> = {
  home: {
    path: "/",
    name: "home",
    title: "Главная",
    requiresAuth: false,
  },
  login: {
    path: "/login",
    name: "login",
    title: "Вход",
    requiresAuth: false,
    redirectIfAuth: true,
  },
  register: {
    path: "/register",
    name: "register",
    title: "Регистрация",
    requiresAuth: false,
    redirectIfAuth: true,
  },
  forgotPassword: {
    path: "/forgot-password",
    name: "forgotPassword",
    title: "Восстановление пароля",
    requiresAuth: false,
    redirectIfAuth: true,
  },
  resetPassword: {
    path: "/reset-password",
    name: "resetPassword",
    title: "Сброс пароля",
    requiresAuth: false,
    redirectIfAuth: true,
  },
  messenger: {
    path: "/messenger",
    name: "messenger",
    title: "Мессенджер",
    requiresAuth: true,
  },
  profile: {
    path: "/profile",
    name: "profile",
    title: "Профиль",
    requiresAuth: true,
  },
  me: {
    path: "/me",
    name: "me",
    title: "Мой профиль",
    requiresAuth: true,
  },
  orders: {
    path: "/orders",
    name: "orders",
    title: "Заказы",
    requiresAuth: true,
  },
  projects: {
    path: "/projects",
    name: "projects",
    title: "Проекты",
    requiresAuth: true,
  },
  portfolio: {
    path: "/portfolio",
    name: "portfolio",
    title: "Портфолио",
    requiresAuth: true,
  },
  notes: {
    path: "/notes",
    name: "notes",
    title: "Заметки",
    requiresAuth: true,
  },
  analytics: {
    path: "/analytics",
    name: "analytics",
    title: "Аналитика",
    requiresAuth: true,
    roles: ["admin", "moderator"],
  },
  settings: {
    path: "/settings",
    name: "settings",
    title: "Настройки",
    requiresAuth: true,
  },
  demo: {
    path: "/demo",
    name: "demo",
    title: "Демо",
    requiresAuth: false,
  },
} as const;

export type RouteChild = RouteObject & {
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    roles?: Array<"user" | "admin" | "moderator">;
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export const routeChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: ROUTES.demo.path,
    element: <DemoPage />,
  },
  {
    path: ROUTES.login.path,
    element: (
      <RedirectIfAuthenticated>
        <LoginPage />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: ROUTES.register.path,
    element: (
      <RedirectIfAuthenticated>
        <RegisterPage />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: ROUTES.forgotPassword.path,
    element: (
      <RedirectIfAuthenticated>
        <ForgotPasswordPage />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: ROUTES.resetPassword.path,
    element: (
      <RedirectIfAuthenticated>
        <ResetPasswordPage />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: ROUTES.messenger.path,
    element: (
      <ProtectedRoute>
        <ChatDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.profile.path,
    element: (
      <ProtectedRoute>
        <UserViewPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.me.path,
    element: (
      <ProtectedRoute>
        <ProfileMePage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.orders.path,
    element: (
      <ProtectedRoute>
        <OrderListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.projects.path,
    element: (
      <ProtectedRoute>
        <ProjectsDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.portfolio.path,
    element: (
      <ProtectedRoute>
        <PortfolioPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.notes.path,
    element: (
      <ProtectedRoute>
        <ProjectKanbanPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.analytics.path,
    element: (
      <ProtectedRoute requiredRoles={["admin", "moderator"]}>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.settings.path,
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Fallback status={404} />,
  },
] as const;