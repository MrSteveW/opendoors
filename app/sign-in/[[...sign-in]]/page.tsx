'use client';

import { SignIn } from '@clerk/nextjs';
import EnterAnimation from '@/app/animation/EnterAnimation';
import bglogo from '@/public/bglogo.webp';
import shiplogo from '@/public/shiplogo.webp';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
      <div className="relative h-75 w-fit">
        <div className="relative">
          <Image src={bglogo} alt="Background" height={300} priority />
        </div>

        <EnterAnimation className="absolute inset-0 z-10">
          <Image src={shiplogo} alt="Ship" height={300} priority />
        </EnterAnimation>
      </div>
      <div>
        <SignIn routing="path" path="/sign-in" />
      </div>
    </div>
  );
}
