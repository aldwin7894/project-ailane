import "preline/preline";
import { Suspense, useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home";

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
      </Route>
    </Routes>
  );
}
