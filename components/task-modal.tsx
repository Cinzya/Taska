"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import type { Task } from "@/lib/types"

interface TaskModalProps {
  onClose: () => void
  onAdd: (task: Task) => void
  onUpdate: (task: Task) => void
  editingTask?: Task | null
}

export default function TaskModal({ onClose, onAdd, onUpdate, editingTask }: TaskModalProps) {
  const [title, setTitle] = useState("")
  const [deadline, setDeadline] = useState("")

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      // Convert ISO string to datetime-local format
      const date = new Date(editingTask.deadline)
      const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
      setDeadline(localDateTime)
    }
  }, [editingTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !deadline) return

    if (editingTask) {
      const updatedTask: Task = {
        ...editingTask,
        title: title.trim(),
        deadline: new Date(deadline).toISOString(),
      }
      onUpdate(updatedTask)
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        title: title.trim(),
        deadline: new Date(deadline).toISOString(),
        completed: false,
        createdAt: new Date().toISOString(),
      }
      onAdd(newTask)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 dark:bg-[#141415]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-[#DEE2E2]">
            {editingTask ? "Edit Task" : "Add New Task"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-[#DEE2E2] mb-1">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#2D2D2D] rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-[#2D2D2D] bg-white dark:bg-[#141415] text-gray-900 dark:text-[#DEE2E2]"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-[#DEE2E2] mb-1">
              Deadline
            </label>
            <input
              type="datetime-local"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#2D2D2D] rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-[#2D2D2D] bg-white dark:bg-[#141415] text-gray-500 dark:text-[#DEE2E2]"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-[#2D2D2D] rounded-xl text-gray-700 dark:text-[#DEE2E2] hover:bg-gray-100 dark:hover:bg-[#1C1C1C]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 border border-gray-300 dark:border-[#2D2D2D] rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-[#2D2D2D] bg-gray-900 dark:bg-[#FEFEFE] text-white dark:text-[#000000] dark:hover:bg-[#E9E9E9] hover:bg-gray-800"
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
