"use client"

import { X } from "lucide-react"

interface DeleteConfirmModalProps {
  onClose: () => void
  onConfirm: () => void
  taskTitle: string
}

export default function DeleteConfirmModal({ onClose, onConfirm, taskTitle }: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#141415] rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-[#DEE2E2]">Delete Task</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 dark:text-[#DEE2E2]">
            Are you sure you want to delete the task <b>{taskTitle}</b>? <br />This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-[#2D2D2D] rounded-xl text-gray-700 dark:text-[#DEE2E2] hover:bg-gray-100 dark:hover:bg-[#1C1C1C]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
