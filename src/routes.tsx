import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import DashboardLayout from "./components/dashboard-layout";
import { AuthGuard } from "./components/auth-guard";
import { DummyFallback } from "./components/dummy-fallback";

const ReportsPage = lazy(() => import("./pages/reports"));
const LoginPage = lazy(() => import("./pages/login"));
const NotFoundPage = lazy(() => import("./pages/not-found-page"));

export function Routes() {
  let router = createBrowserRouter([
    {
      path: "login",
      element: (
        <Suspense fallback={<DummyFallback />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: <ReportsPage />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
