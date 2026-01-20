'use client';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function GuestButton() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const handleGuestLogin = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: 'guest',
        password: process.env.NEXT_PUBLIC_GUEST_PASSWORD,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/');
      }
    } catch (err) {
      console.error('Guest login failed', err);
    }
  };

  return (
    <button
      onClick={handleGuestLogin}
      className="bg-teal-800 text-white w-30 px-4 py-2 rounded"
    >
      Guest
    </button>
  );
}
