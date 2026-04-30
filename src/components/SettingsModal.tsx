import { Trash2, X } from "lucide-react"
import { createPortal } from "react-dom"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

function ThemeSelector() {
  const [theme] = useState<"light"|"dark">("light")

  return (
    <div>
      <label>Theme</label>

      <select 
        disabled
        defaultValue={theme} 
        className="disabled:opacity-60 disabled:cursor-not-allowed outline-none rounded-xl w-full border border-neutral-300 p-2"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <small className="text-neutral-900/80">Coming soon</small>
    </div>
  )
}

function SettingsModalContent({ close }: {
  close: () => void
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, transition: { duration: 0.25 } }}
      animate={{ opacity: 1, transition: { duration: 0.25 } }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      id="dialog-container"
    >
      <dialog open className="z-100 h-3/5 w-4/5 lg:h-2/3 lg:w-1/3 relative border border-neutral-300 bg-neutral-50 shadow-lg rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold font-display text-4xl">settings</h3>

          <button className="cursor-pointer absolute top-3.5 right-3.5" onClick={close}>
            <X />
          </button>
        </div>

        <div className="space-y-2">
          <ThemeSelector />

          <div>
            <p>Data Management</p>

            <button onClick={() => {
              localStorage.clear()
              location.reload()
            }} className="btn bg-red-800 text-white rounded-xl">
              <Trash2 size={18} />
              Wipe Data
            </button>
          </div>
        </div>
      </dialog>
    </motion.div>
  )
}

export default function SettingsModal({ open, close }: {
  open: boolean
  close: () => void
}) {
  return (
    createPortal(    
      <AnimatePresence>
        {open && <SettingsModalContent close={close} />}
      </AnimatePresence>,
      document.body
    )
  )
}