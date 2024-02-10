import { useEffect, useState } from "react";

import SalesList from "./SalesList";

export default function Sales(): JSX.Element {
  const [sales, setSales] = useState<Sales[]>([]);
  const newSale = async () => {
    const data = await window.api.createSale({
      invoice_number: `INV-${Math.round(Math.random() * 100)}`,
      total_amount: 1000,
      discount_amount: 0,
      tax_amount: 12,
    });
    setSales(prev => [...prev, data]);
  };

  useEffect(() => {
    const getSales = async () => {
      const data = await window.api.getSales();
      setSales(data);
    };

    getSales();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Sales</h1>
      <SalesList sales={sales} />
      <div>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={newSale}
        >
          Create Sale
        </button>
      </div>
    </div>
  );
}
