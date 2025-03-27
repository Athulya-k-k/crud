import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-900 px-10 py-4 shadow-md">
      {/* Brand Logo */}
      <Link href="/" className="text-white text-2xl font-semibold tracking-wide">
        CRUD App
      </Link>

      {/* Add Items Button */}
      <Link
        href="/addTopic"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-600 transition-all"
      >
        + Add Item
      </Link>
    </nav>
  );
}
