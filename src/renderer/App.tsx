import { JSX, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import Expenses from "./components/Expenses";
import Home from "./components/Home";
import Reports from "./components/Reports";
import Sales from "./components/Sales";
import NewSale from "./components/Sales/NewSale";
import MainLayout from "./layouts/MainLayout";

export default function App(): JSX.Element {
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
        <Route path="/sales/new" element={<NewSale />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}
