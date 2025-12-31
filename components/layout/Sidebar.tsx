"use client"

import Link from "next/link"

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-sidebar text-sidebar-foreground p-4">
      <h2 className="mb-6 text-lg font-semibold">Admin</h2>
      <nav className="space-y-2">
        <Link
          href="/dashboard"
          className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
        >
          Projects
        </Link>
      </nav>
    </aside>
  )
}
