import { JSX } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NewSale(): JSX.Element {
  const navigate = useNavigate();

  const newSale = async () => {
    await window.api.createSale({
      invoice_number: `INV-${Math.round(Math.random() * 100)}`,
      total_amount: 1000,
      discount_amount: 0,
      tax_amount: 12,
    });

    navigate("/sales");
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">New Sale</h1>

      <div className="flex flex-row gap-2">
        <Link
          to="/sales"
          className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          Cancel
        </Link>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={newSale}
        >
          Save
        </button>
      </div>
    </div>
  );
}
