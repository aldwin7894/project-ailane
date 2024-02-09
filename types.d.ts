import { ElectronAPI } from "@electron-toolkit/preload";
import { IStaticMethods } from "preline/preline";

declare global {
  interface Window {
    electron: ElectronAPI;
    HSStaticMethods: IStaticMethods;
    api: unknown;
  }
}
