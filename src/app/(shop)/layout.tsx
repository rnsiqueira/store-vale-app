import type { Metadata } from "next";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-green/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../globals-prime.css'
import ToolbarStore from "../components/toolbar-store";

export const metadata: Metadata = {
  title: "VS - Loja",
  description: "Loja com bons descontos em compras via pix.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">

      <body className="">

        <PrimeReactProvider>
          <ToolbarStore />
          <main>
            {children}
          </main>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
