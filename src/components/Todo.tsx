import { Check, Trash2 } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { useState } from "react"

function TodoCheck({ done }: { done: boolean }) {
  // hopefully literally nobody notices the color difference
  
  return (
    <div className={done ? "todo-check-done" : "todo-check bg-transparent text-transparent"}>
      <Check size={12} strokeWidth={4} className={done ? "text-neutral-200" : "text-transparent"} />
    </div>
  )
}

export default function Todo({ label, done, onMarked, onDelete }: {
  label: string
  done: boolean
  onMarked: () => void
  onDelete: () => void
}) {
  // This state variable is used to ensure spamming after deleting doesn't cause an error
  // DO NOT REMOVE!!!
  const [deleted, setDeleted] = useState(false)

  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.025 } }}
      exit={{ scale: 0, opacity: 0, x: 1000, transition: { duration: 0.25 } }}
      onClick={deleted ? () => null : onMarked} 
      className="group cursor-pointer hover:bg-neutral-200/75 duration-200 p-1.5 rounded-xl flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <button onClick={(e) => {
          e.stopPropagation()
          if (!deleted) onMarked()
        }}>
          <TodoCheck done={done} />
        </button>

        {done ? <s>{label}</s> : <p>{label}</p>}
      </div>

      <AnimatePresence>
        {!deleted &&
          <button 
            disabled={deleted}
            className="group-hover:opacity-100 duration-200 opacity-50 cursor-pointer" 
            onClick={(e) => {
              e.stopPropagation()
              setDeleted(true)
              onDelete()
            }}
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        }
      </AnimatePresence>
    </motion.div>
  )
}