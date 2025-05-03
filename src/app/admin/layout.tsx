import type { Metadata } from "next";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-green/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../globals-prime.css'
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";


export const metadata: Metadata = {
  title: "Admin Pedidos",
  description: "Tela gestão de pedidos",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession()




  return (
    <html lang="en">

      <body>

        <PrimeReactProvider>
          <SessionProvider session={session} >
            <main className="flex p-4 sm:w-full justify-content-center">
              {children}
            </main>
          </SessionProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
