import { JSX } from "react";

export default function Home(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");
  const rollbackDb = (): void => window.electron.ipcRenderer.send("rollbackDb");

  return (
    <div className="flex flex-row gap-2">
      <button type="button" className="btn btn-primary" onClick={ipcHandle}>
        Send IPC
      </button>
      <button type="button" className="btn btn-primary" onClick={rollbackDb}>
        Rollback DB
      </button>
    </div>
  );
}
