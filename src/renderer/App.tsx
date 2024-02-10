import { Suspense, useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home";
import Sales from "./components/Sales";
import Expenses from "./components/Expenses";
import Reports from "./components/Reports";

export default function App(): JSX.Element {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </Suspense>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}
