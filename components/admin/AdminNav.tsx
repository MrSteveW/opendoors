import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <Link href="/">Calendar</Link>
      <Link href="/admin">Admin</Link>
    </div>
  );
}
