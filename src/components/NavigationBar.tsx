import { Settings } from "lucide-react"

export default function NavigationBar({ onSettingsOpen }: {
  onSettingsOpen: () => void
}) {
  return (
    <nav className="z-50 top-0 sticky py-3 px-6 bg-neutral-50 border-neutral-300 border-b flex items-center justify-between">
      <h1 className="font-display font-semibold text-5xl">cinch</h1>

      <div>
        <button className="group p-2 cursor-pointer rounded-xl" onClick={onSettingsOpen}>
          <Settings className="group-hover:rotate-180 duration-500" />
        </button>
      </div>
    </nav>
  )
}