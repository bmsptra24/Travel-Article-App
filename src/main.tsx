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
import MyArticlePage from "./pages/dashboard/MyArticlePage.tsx";
import EditArticlePage from "./pages/dashboard/FormArticlePage.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import CategoryPage from "./pages/dashboard/CategoryPage.tsx";
import EditCategoryPage from "./pages/dashboard/FormCategoryPage.tsx";

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
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "article",
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <MyArticlePage />,
          },
          {
            path: ":id",
            element: <EditArticlePage />,
          },
        ],
      },
      {
        path: "category",
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <CategoryPage />,
          },
          {
            path: ":id",
            element: <EditCategoryPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/profile",
    element: <MyCommentsPage />,
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
