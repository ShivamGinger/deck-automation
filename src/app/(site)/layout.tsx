import type { Metadata } from 'next';
import '../globals.css';

import SessionProvider from "@/utils/SessionProvider";
import { getServerSession } from 'next-auth';
import Sidebar from './Components/Sidebar';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className='bg-gray-100 flex h-screen'>
        <SessionProvider session={session}>
          <Sidebar />
          <div className='bg-[#FEFAEF] w-screen'>
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
