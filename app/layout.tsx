import type { Metadata } from 'next';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from '@clerk/nextjs';
import { Mulish } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import AdminNav from '@/components/admin/AdminNav';
import Image from 'next/image';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${mulish.variable}  ${atomatic.variable}  antialiased`}
        >
          <SignedIn>
            <header className="flex items-center  h-16">
              <div className="w-full h-full text-center font-family-atomatic text-5xl items-center">
                Radio Drake
                <div className="fixed top-0 right-150">
                  <Image src="/logosm.png" alt="" height={60} width={60} />
                </div>
              </div>
              <div className="flex flex-row w-70 fixed top-5 left-0 items-center">
                <AdminNav />
              </div>

              <div className="scale-150 fixed top-5 right-7">
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
