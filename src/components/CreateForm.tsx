import { Plus } from "lucide-react"

export default function CreateForm({ draft, onSubmit, onDraftUpdated }: {
  draft: string
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  onDraftUpdated: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <form className="flex items-center gap-2" onSubmit={onSubmit}>
      <input 
        onChange={onDraftUpdated}
        value={draft}
        type="text" 
        name="draft"
        className="outline-none rounded-xl w-full border border-neutral-300 p-2" 
        placeholder="Wash the dishes..." 
      />

      <button 
        className="flex gap-2 items-center border border-neutral-800 bg-neutral-800 text-neutral-100 btn rounded-xl"
        type="submit"
      >
        <Plus size={18} />
        Add
      </button>
    </form>
  )
}