"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"

interface UserNameModalProps {
  onClose: () => void
  onUpdate: (name: string) => void
  currentName: string
}

export default function UserNameModal({ onClose, onUpdate, currentName }: UserNameModalProps) {
  const t = useTranslations('UserNameModal')
  const [name, setName] = useState(currentName)

  useEffect(() => {
    setName(currentName)
  }, [currentName])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    onUpdate(name.trim())
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#141415] rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-[#DEE2E2]">{t('title')}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-[#DEE2E2] mb-1">
              {t('nameLabel')}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#2D2D2D] rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-[#2D2D2D] bg-white dark:bg-[#141415] text-gray-900 dark:text-[#DEE2E2]"
              placeholder={t('namePlaceholder')}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-[#2D2D2D] rounded-xl text-gray-700 dark:text-[#DEE2E2] hover:bg-gray-100 dark:hover:bg-[#1C1C1C]"
            >
              {t('cancelButton')}
            </button>
            <button
              type="submit"
              className="px-3 py-2 border border-gray-300 dark:border-[#2D2D2D] rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-[#2D2D2D] bg-gray-900 dark:bg-[#FEFEFE] text-white dark:text-[#000000] dark:hover:bg-[#E9E9E9] hover:bg-gray-800"
            >
              {t('updateNameButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
