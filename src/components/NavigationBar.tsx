import { CodeXml, Settings } from "lucide-react"

export default function NavigationBar({ onSettingsOpen }: {
  onSettingsOpen: () => void
}) {
  return (
    <nav className="z-50 top-0 sticky py-3 px-6 bg-neutral-50 border-neutral-300 border-b flex items-center justify-between">
      <h1 className="font-display font-semibold text-5xl">cinch</h1>

      <div className="flex items-center gap-2">
        <a title="Source Code" target="__window" href="https://github.com/writepoems/cinch" className="group p-2 cursor-pointer rounded-xl">
          <CodeXml className="group-hover:animate-pulse" />
        </a>

        <button title="Settings" name="Settings" className="group p-2 cursor-pointer rounded-xl" onClick={onSettingsOpen}>
          <Settings className="group-hover:rotate-180 duration-500" />
        </button>
      </div>
    </nav>
  )
}