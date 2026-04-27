'use client';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { getGuestCredentials } from '@/lib/guestActions';

export default function GuestButton({ org }: { org: 'drake' | 'wicklewood' }) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const handleGuestLogin = async () => {
    if (!isLoaded) return;
    try {
      const { identifier, password } = await getGuestCredentials(org);
      const result = await signIn.create({ identifier, password });
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
