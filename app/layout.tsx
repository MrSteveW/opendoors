import type { Metadata } from 'next';
import { ClerkProvider, SignedIn, UserButton } from '@clerk/nextjs';
import { Mulish } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import AdminNav from '@/components/admin/AdminNav';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs/server';

// import logosm from "../../public/logosm.png";

const mulish = Mulish({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const atomatic = localFont({
  src: './fonts/linotypeatomatic.ttf',
  variable: '--font-atomatic',
});

export const metadata: Metadata = {
  title: 'OpenDoors',
  description: 'OpenDoors booking v4',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${mulish.variable}  ${atomatic.variable}  antialiased`}
        >
          <SignedIn>
            <header className="w-full flex h-12 text-center items-center">
              <div className="flex flex-row w-70 fixed top-5 left-0 items-center">
                {role === 'admin' && <AdminNav />}
              </div>
              <div className="flex w-full h-full items-center justify-center">
                <div className="font-family-atomatic text-5xl mx-2">
                  Radio Drake
                </div>
                <div className="mx-2">
                  <Image src="/logosm.png" alt="" height={50} width={50} />
                </div>
                <div className="mx-2 text-2xl italic">({role})</div>
              </div>

              <div className="scale-150 fixed top-3 right-15">
                <UserButton />
              </div>
            </header>
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
