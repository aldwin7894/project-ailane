import { JSX } from "react";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Readonly<Props>): JSX.Element {
  return (
    <>
      <NavBar />
      <main className="container min-h-[80vh] max-w-[85rem] py-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
