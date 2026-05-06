'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center text-3xl">
      <div className="w-100 text-center">
        <h2>Oops!</h2>
        <p>We have run into an error.</p>

        <button
          onClick={reset}
          className="text-black bg-opengreen box-border border border-transparent hover:bg-brand-strong focus:ring-1 focus:ring-openblue-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-3 focus:outline-none pointer-cursor"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
