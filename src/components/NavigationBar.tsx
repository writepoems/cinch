import { CodeXml, Settings } from "lucide-react"
import { motion } from "motion/react"

export default function NavigationBar({ onSettingsOpen }: {
  onSettingsOpen: () => void
}) {
  return (
    <nav className="z-50 top-0 sticky py-3 px-6 bg-neutral-50 border-neutral-300 border-b flex items-center justify-between">
      <h1 className="font-display font-semibold text-5xl">cinch</h1>

      <div className="flex items-center gap-2">
        <motion.a 
          title="Source Code" 
          target="__window" 
          href="https://github.com/writepoems/cinch" 
          className="p-2 cursor-pointer rounded-xl"
          whileHover={{
            scale: 1.1,
            transition: {
              duration: 0.25
            }
          }}
        >
          <CodeXml />
        </motion.a>

        <motion.button 
          title="Settings" 
          name="Settings" 
          className="group p-2 cursor-pointer rounded-xl" 
          onClick={onSettingsOpen}
          whileHover={{
            scale: 1.1,
            rotate: 180,
            transition: {
              duration: 0.25
            }
          }}
        >
          <Settings />
        </motion.button>
      </div>
    </nav>
  )
}