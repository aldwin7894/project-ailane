import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { JSX, useEffect, useState } from "react";

type Props = {
  sales: Sales[];
};

export default function SalesList({
  sales = [],
}: Readonly<Props>): JSX.Element {
  const [rowData, setRowData] = useState([...sales]);
  const colDefs: ColDef[] = [
    { headerName: "Invoice Number", field: "invoice_number" },
    { headerName: "Date", field: "invoice_date" },
    { headerName: "Customer", field: "customer_name" },
    { headerName: "Contact", field: "customer_contact" },
    { headerName: "Total", field: "total_amount" },
    { headerName: "Discount", field: "discount_amount" },
    { headerName: "Tax", field: "tax_amount" },
  ];

  useEffect(() => {
    setRowData([
      ...sales.map(sale => {
        sale.invoice_date = new Date(sale.invoice_date).toLocaleDateString();
        return sale;
      }),
    ]);
  }, [sales]);

  return (
    <div className="ag-theme-quartz-auto-dark h-96">
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        autoSizeStrategy={{
          type: "fitGridWidth",
          defaultMinWidth: 100,
        }}
        defaultColDef={{
          sortable: true,
          filter: true,
        }}
        className="size-full"
      />
    </div>
  );
}
