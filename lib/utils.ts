import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()

  // If the date is in the past
  if (date < now) {
    return formatDistanceToNow(date, { addSuffix: true })
  }

  // If the date is in the future
  return `in ${formatDistanceToNow(date)}`
}

export function formatTimeWithRelative(dateString: string): string {
  const date = new Date(dateString)
  const timeString = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const relativeString = formatDistanceToNow(date, { addSuffix: true })

  return `${timeString} (${relativeString})`
}

export function isWithinLastDays(dateString: string, days: number): boolean {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  return diffDays <= days
}

export function isOverdue(dateString: string): boolean {
  const date = new Date(dateString)
  const now = new Date()
  return date < now
}
