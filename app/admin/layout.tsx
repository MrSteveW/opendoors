'use client';
import { useAdminPanel } from '@/stores/useAdminPanel';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminMode = useAdminPanel((state) => state.adminMode);
  const setAdminMode = useAdminPanel((state) => state.setAdminMode);
  const links = [
    { name: 'Classes' },
    { name: 'Producers' },
    { name: 'Times' },
    { name: 'Stats' },
  ] as const;
  return (
    <div className="flex min-h-screen w-screen">
      <nav className="w-40 h-screen flex flex-col pt-8 p-2 gap-y-4 items-start bg-openlightgreen rounded-md text-2xl cursor-pointer">
        {links.map((link) => {
          const isActive = adminMode === link.name;
          return (
            <div
              key={link.name}
              onClick={() => setAdminMode(`${link.name}`)}
              className={`p-1 rounded-md ${
                isActive
                  ? 'text-gray-400 cursor-default '
                  : 'text-black hover:bg-openyellow '
              }`}
            >
              {link.name}
            </div>
          );
        })}
      </nav>
      <main className="flex w-full">{children}</main>
    </div>
  );
}
