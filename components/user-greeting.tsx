"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

interface UserGreetingProps {
  userName: string
  isReturningUser: boolean
  onEditClick: () => void
}

export default function UserGreeting({ userName, isReturningUser, onEditClick }: UserGreetingProps) {
  const t = useTranslations('UserGreeting')
  const [isHovered, setIsHovered] = useState(false)

  const displayName = userName || t('defaultName')
  const greeting = isReturningUser 
    ? t('welcomeBack', { name: displayName })
    : t('hello', { name: displayName })

  return (
    <div className="text-center">
      <h1
        className="text-2xl font-semibold text-gray-600 dark:text-[#DEE2E2] cursor-pointer inline-flex items-center space-x-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onEditClick}
      >
        <span>{greeting}</span>
        {isHovered && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        )}
      </h1>
    </div>
  )
}
