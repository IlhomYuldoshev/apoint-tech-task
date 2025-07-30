import React, { Suspense } from "react";
import { Outlet } from "react-router";
import { useAuthContext } from "../../context/auth/use-auth-context";
import { DummyFallback } from "../dummy-fallback";

type Props = {};

const DashboardLayout = (props: Props) => {
  const { logout } = useAuthContext();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md mb-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <h1 className="text-2xl font-bold">Apoint Tech Task</h1>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4">
        <Suspense fallback={<DummyFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="bg-gray-100 mt-4">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Apoint Tech Task. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
