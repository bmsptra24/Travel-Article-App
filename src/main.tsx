import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LandingPage from "./pages/landing-page/LandingPage.tsx";
import "./index.css";

// react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error/ErrorPage.tsx";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";
import ArticlePage from "./pages/article/ArticlePage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import SuperAdminPage from "./pages/superadmin/SuperAdminPage.tsx";
import MyCommentsPage from "./pages/profile/MyCommentsPage.tsx";
import DetailArticle from "./pages/article/DetailArticlePage.tsx";
import ArticleLayout from "./layouts/ArticleLayout.tsx";
import MyArticlePage from "./pages/article/MyArticlePage.tsx";
import EditArticlePage from "./pages/article/FormArticlePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/article",
    element: <ArticleLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ArticlePage />,
      },
      {
        path: ":id",
        element: <DetailArticle />,
      },
      {
        path: "edit",
        element: <MyArticlePage />,
      },
      {
        path: "edit/:id",
        element: <EditArticlePage />,
      },
    ],
  },
  {
    path: "/profile",
    element: <MyCommentsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/super-admin",
    element: <SuperAdminPage />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
