'use client';

import { useSignIn, SignIn } from '@clerk/nextjs';
import EnterAnimation from '@/app/animation/EnterAnimation';
import bglogo from '@/public/bglogo.webp';
import shiplogo from '@/public/shiplogo.webp';
import Image from 'next/image';

export default function Page() {
  const { isLoaded } = useSignIn();
  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
      {isLoaded && (
        <div className="h-4/10 w-full  flex items-center ">
          <div className="fixed w-full">
            <div className="relative justify-items-center">
              <Image src={bglogo} alt="Background" height={200} priority />
            </div>

            <EnterAnimation className="absolute inset-0 z-10 justify-items-center">
              <Image src={shiplogo} alt="Ship" height={200} priority />
            </EnterAnimation>
          </div>
        </div>
      )}

      <div className="h-6/10">
        <SignIn routing="path" path="/sign-in" />
      </div>
    </div>
  );
}
