import { ElectronAPI } from "@electron-toolkit/preload";
import { IStaticMethods } from "preline/preline";
import { api } from "./src/preload";

declare global {
  interface Window {
    electron: ElectronAPI;
    HSStaticMethods: IStaticMethods;
    api: typeof api;
  }

  interface Sales {
    invoice_number: string;
    total_amount: number;
    discount_amount: number;
    tax_amount: number;
  }
}
