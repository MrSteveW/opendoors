import Link from 'next/link';

export default function AdminNav() {
  return (
    <div className="w-full flex justify-evenly text-2xl">
      <Link href="/" className="hover:text-openblue hover:underline">
        Calendar
      </Link>
      <Link href="/admin" className="hover:text-openblue hover:underline">
        Admin
      </Link>
    </div>
  );
}
