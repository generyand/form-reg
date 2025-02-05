interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-300 mb-6">{message}</p>
        
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white 
                     rounded-lg transition duration-200 ease-in-out transform 
                     hover:scale-105 focus:outline-none focus:ring-2 
                     focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white 
                     rounded-lg transition duration-200 ease-in-out transform 
                     hover:scale-105 focus:outline-none focus:ring-2 
                     focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
} 