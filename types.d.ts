import { ElectronAPI } from "@electron-toolkit/preload";

import { api } from "./src/preload";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: typeof api;
  }

  interface Sales {
    invoice_number: string;
    customer_name?: string;
    customer_contact?: string;
    invoice_date: string;
    cogs_amount: number;
    total_amount: number;
    discount_amount: number;
    tax_amount: number;
  }
}
