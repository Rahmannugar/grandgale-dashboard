import { MobileSidebar } from "./MobileSidebar"

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <MobileSidebar />
      <h1 className="text-lg font-semibold">Projects Dashboard</h1>
    </header>
  )
}
