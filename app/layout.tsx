import type { Metadata } from 'next';
import { ClerkProvider, SignedIn, UserButton } from '@clerk/nextjs';
import { Mulish } from 'next/font/google';
import { Comfortaa } from 'next/font/google';
import localFont from 'next/font/local';
import AdminNav from '@/components/admin/AdminNav';
import './globals.css';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs/server';
import SchName from '@/components/SchName';

// import logosm from "../../public/logosm.png";

const mulish = Mulish({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const comfortaa = Comfortaa({
  variable: '--font-comfortaa',
  subsets: ['latin'],
});

const atomatic = localFont({
  src: './fonts/linotypeatomatic.ttf',
  variable: '--font-atomatic',
});

export const metadata: Metadata = {
  title: 'OpenDoors',
  description: 'OpenDoors booking app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const role = user?.publicMetadata?.user_role as string;

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${mulish.variable}  ${atomatic.variable}  ${comfortaa.variable}  antialiased`}
        >
          <SignedIn>
            <header className="w-full flex h-10 text-center items-center">
              <div className="flex flex-row w-70 items-center">
                {role === 'admin' && <AdminNav />}
              </div>
              <div className="flex w-full h-full items-center justify-center">
                <div className="font-family-atomatic text-4xl mx-2">
                  Radio <SchName />
                </div>
                <div className="mx-2">
                  <Image src="/logosm.png" alt="" height={40} width={40} />
                </div>
                <div className="mx-2 text-2xl italic">({role})</div>
              </div>

              <div className="scale-120 fixed top-2 right-15">
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
