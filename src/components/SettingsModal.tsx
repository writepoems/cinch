import { Trash2, X } from "lucide-react"
import { createPortal } from "react-dom"

import { AnimatePresence, motion } from "motion/react"

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

          <button className="cursor-pointer" onClick={close}>
            <X />
          </button>
        </div>

        <button onClick={() => {
          localStorage.clear()
          location.reload()
        }} className="btn bg-red-800 text-white rounded-xl">
          <Trash2 size={18} />
          Wipe Data
        </button>
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