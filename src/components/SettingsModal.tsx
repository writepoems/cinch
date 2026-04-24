import { Trash2, X } from "lucide-react";

export default function SettingsModal({ open, close }: {
  open: boolean
  close: () => void
}) {
  return (
    <div id="dialog-container" className={open ? "" : "hidden"}>
      <dialog open className="z-100 h-2/3 w-1/3 relative border border-neutral-300 bg-neutral-50 shadow-lg rounded-xl p-4">
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
    </div>
  )
}