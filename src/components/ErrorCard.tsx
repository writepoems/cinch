import { AlertTriangle } from "lucide-react"

export default function Error({ message, onDismiss }: {
  message: string
  onDismiss: () => void
}) {
  return (
    <div className="animate-fade-in mb-2 p-3 border-red-700 bg-red-200 text-red-700 border rounded-xl">
      <h3 className="font-bold flex items-center gap-2">
        <AlertTriangle />
        Error
      </h3>

      <p>{message}</p>

      <button className="cursor-pointer text-xs underline" onClick={onDismiss}>Dismiss</button>
    </div>
  )
}