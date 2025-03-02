import { JSX } from "react";

export default function Footer(): JSX.Element {
  const { versions } = window.electron.process;

  return (
    <footer className="dark:bg-gradient-to-t dark:from-blue-900/[.15] dark:to-transparent">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <ul>
          <li>Electron v{versions.electron}</li>
          <li>Chromium v{versions.chrome}</li>
          <li>Node v{versions.node}</li>
        </ul>
      </div>
    </footer>
  );
}
