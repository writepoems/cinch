import { X } from "lucide-react";

export default function SettingsModal({ open, close }: {
  open: boolean
  close: () => void
}) {
  return (
    <div id="dialog-container" className={open ? "" : "hidden"}>
      <dialog open className="z-100 h-2/3 w-1/3 relative border border-neutral-300 bg-neutral-50 shadow-lg rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold font-display text-4xl">settings</h3>

          <button className="cursor-pointer" onClick={close}>
            <X />
          </button>
        </div>

        <p>Coming soon</p>
      </dialog>
    </div>
  )
}