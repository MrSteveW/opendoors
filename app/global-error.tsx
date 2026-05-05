'use client';
import './globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center text-3xl">
          <div className="w-100 text-center">
            <h2>Oops!</h2>
            <p>Something went wrong</p>
            <p>{error.digest && ` (ref: ${error.digest})`}</p>

            <button
              onClick={reset}
              className="text-black bg-opengreen box-border border border-transparent hover:bg-brand-strong focus:ring-1 focus:ring-openblue-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-3 focus:outline-none pointer-cursor"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
