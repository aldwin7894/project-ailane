import clsx from "clsx";
import { JSX } from "react";
import { Link, useLocation } from "react-router-dom";

import electronLogo from "../assets/electron.svg";

export default function NavBar(): JSX.Element {
  const location = useLocation();
  const { pathname } = location;

  return (
    <header className="z-50 flex w-full flex-wrap bg-blue-600 py-4 text-sm sm:flex-nowrap sm:justify-start">
      <nav
        className="mx-auto w-full max-w-[85rem] px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <a
            className="inline-flex items-center gap-x-2 text-xl font-semibold text-white"
            href="#"
          >
            <img className="h-auto w-10" src={electronLogo} alt="Logo" />
            <h1>Brand</h1>
          </a>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle inline-flex items-center justify-center gap-2 rounded-lg border border-white/[.25] bg-blue-600 p-2 align-middle text-sm font-medium text-white shadow-sm transition-all hover:bg-white/[.15] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              data-hs-collapse="#navbar-primary"
              aria-controls="navbar-primary"
              aria-label="Toggle navigation"
            >
              <svg
                className="size-4 shrink-0 hs-collapse-open:hidden"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hidden size-4 shrink-0 hs-collapse-open:block"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-primary"
          className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block"
        >
          <div className="mt-5 flex flex-col gap-5 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5">
            <Link
              className={clsx(
                "font-medium",
                pathname === "/"
                  ? "text-white"
                  : "text-gray-300 hover:text-white",
              )}
              to="/"
            >
              Home
            </Link>
            <Link
              className={clsx(
                "font-medium",
                pathname === "/sales"
                  ? "text-white"
                  : "text-gray-300 hover:text-white",
              )}
              to="/sales"
            >
              Sales
            </Link>
            <Link
              className={clsx(
                "font-medium",
                pathname === "/expenses"
                  ? "text-white"
                  : "text-gray-300 hover:text-white",
              )}
              to="/expenses"
            >
              Expenses
            </Link>
            <Link
              className={clsx(
                "font-medium",
                pathname === "/reports"
                  ? "text-white"
                  : "text-gray-300 hover:text-white",
              )}
              to="/reports"
            >
              Report
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
