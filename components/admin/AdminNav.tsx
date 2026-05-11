'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();
  const links = [
    { name: 'Calendar', href: '/' },
    { name: 'Admin', href: '/admin' },
  ];
  return (
    <nav className="w-full flex justify-evenly text-xl">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`p-1 rounded-md transition-colors ${
              isActive
                ? 'text-gray-400 cursor-default '
                : 'text-black hover:bg-slate-300'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
