import { AlertTriangle, X } from "lucide-react"
import { motion } from "motion/react"

export default function Error({ title, message, onDismiss }: {
  title: string
  message: string
  onDismiss: () => void
}) {
  return (
    <motion.div 
      transition={{ duration: 0.25 }}
      initial={{ opacity: 0, scale: 0.75, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 5 }}
      exit={{ opacity: 0, scale: 0.75, y: -50 }}
      className="absolute top-0 z-100 left-0 w-full flex items-center justify-center"
    >
      <div className="w-96 flex justify-between items-center gap-2 p-3 shadow-lg border-red-700 bg-red-200 text-red-700 border rounded-xl">
        <div className="flex items-center gap-2">
          <AlertTriangle size={30} className="text-red-700" />

          <div>
            <h3 className="font-bold items-center gap-2">
              {title}
            </h3>

            <p className="text-sm">{message}</p>
          </div>
        </div>

        <motion.button
          transition={{ duration: 0.25 }}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
          onClick={onDismiss}
        >
          <X />
        </motion.button>
      </div>
    </motion.div>
  )
}