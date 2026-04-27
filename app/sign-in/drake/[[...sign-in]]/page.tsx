'use client';

import { useSignIn, SignIn } from '@clerk/nextjs';
import EnterAnimation from '@/app/animation/EnterAnimation';
import bglogo from '@/public/bglogo.webp';
import shiplogo from '@/public/shiplogo.webp';
import Link from 'next/link';
import Image from 'next/image';
import GuestButton from '../../GuestButton';
import { CircleArrowLeft } from 'lucide-react';

export default function Page() {
  const { isLoaded } = useSignIn();
  return (
    <div className="h-screen bg-yellow-50 flex flex-col items-center justify-center">
      {isLoaded && (
        <div className="h-4/10 w-full  flex items-center ">
          <div className="fixed w-full flex items-center">
            <div className="relative justify-items-center flex-1">
              <Image src={bglogo} alt="Background" height={200} priority />
            </div>

            <EnterAnimation className="absolute inset-0 z-10 justify-items-center">
              <Image src={shiplogo} alt="Ship" height={200} priority />
            </EnterAnimation>
          </div>
        </div>
      )}

      <div className="h-6/10 flex flex-col justify-center-safe items-center">
        <div className="flex gap-x-5">
          <div>
            <Link href="/sign-in">
              <CircleArrowLeft size={40} />
            </Link>
          </div>
          <div className="mb-2 cursor-pointer">
            <GuestButton org="drake" />
          </div>
        </div>

        <SignIn
          routing="path"
          path="/sign-in/drake"
          forceRedirectUrl="/"
          appearance={{
            elements: {
              rootBox: 'mx-auto',
            },
          }}
          signUpUrl="sign-in/drake"
        />
      </div>
    </div>
  );
}
