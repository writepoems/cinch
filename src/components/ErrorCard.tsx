import { AlertTriangle } from "lucide-react"
import { motion } from "motion/react"

export default function Error({ message, onDismiss }: {
  message: string
  onDismiss: () => void
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-2 p-3 border-red-700 bg-red-200 text-red-700 border rounded-xl"
    >
      <h3 className="font-bold flex items-center gap-2">
        <AlertTriangle />
        Error
      </h3>

      <p>{message}</p>

      <button className="cursor-pointer text-xs underline" onClick={onDismiss}>Dismiss</button>
    </motion.div>
  )
}