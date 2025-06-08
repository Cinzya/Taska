"use client"

import { useState } from "react"
import { X, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"

interface TimezoneInfo {
  id: string
  timezone: string
  label: string
}

interface TimezoneModalProps {
  onClose: () => void
  onUpdate: (timezones: TimezoneInfo[]) => void
  currentTimezones: TimezoneInfo[]
}

const COMMON_TIMEZONES = [
  { value: "America/New_York", label: "New York (EST/EDT)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)" },
  { value: "America/Chicago", label: "Chicago (CST/CDT)" },
  { value: "America/Denver", label: "Denver (MST/MDT)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
  { value: "Europe/Berlin", label: "Berlin (CET/CEST)" },
  { value: "Europe/Rome", label: "Rome (CET/CEST)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)" },
  { value: "Asia/Kolkata", label: "Mumbai (IST)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
  { value: "Pacific/Auckland", label: "Auckland (NZST/NZDT)" },
  { value: "America/Sao_Paulo", label: "São Paulo (BRT)" },
  { value: "Africa/Cairo", label: "Cairo (EET)" },
]

export default function TimezoneModal({ onClose, onUpdate, currentTimezones }: TimezoneModalProps) {
  const t = useTranslations('TimezoneModal')
  const [timezones, setTimezones] = useState<TimezoneInfo[]>(currentTimezones)
  const [selectedTimezone, setSelectedTimezone] = useState("")

  const addTimezone = () => {
    if (!selectedTimezone || timezones.length >= 10) return
    if (timezones.some((tz) => tz.timezone === selectedTimezone)) return

    const timezoneData = COMMON_TIMEZONES.find((tz) => tz.value === selectedTimezone)
    if (!timezoneData) return

    const newTimezone: TimezoneInfo = {
      id: Date.now().toString(),
      timezone: selectedTimezone,
      label: timezoneData.label.split(" (")[0],
    }

    setTimezones([...timezones, newTimezone])
    setSelectedTimezone("")
  }

  const removeTimezone = (id: string) => {
    if (timezones.length <= 1) return
    setTimezones(timezones.filter((tz) => tz.id !== id))
  }

  const moveTimezone = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === timezones.length - 1)) return

    const newTimezones = [...timezones]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    const temp = newTimezones[index]
    newTimezones[index] = newTimezones[targetIndex]
    newTimezones[targetIndex] = temp

    setTimezones(newTimezones)
  }

  const handleSubmit = () => {
    onUpdate(timezones)
  }

  const availableTimezones = COMMON_TIMEZONES.filter(
    (tz) => !timezones.some((existing) => existing.timezone === tz.value),
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#141415] rounded-xl shadow-lg w-full max-w-md p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-[#DEE2E2]">{t('title')}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Current Timezones */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-[#DEE2E2] mb-2">
              {t('currentTimezonesLabel')} ({timezones.length}/10)
            </h4>
            <div className="space-y-2">
              {timezones.map((tz, index) => (
                <div
                  key={tz.id}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-[#2D2D2D] rounded-lg"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    {timezones.length > 1 && (
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => moveTimezone(index, "up")}
                          disabled={index === 0}
                          className={`p-1 rounded ${
                            index === 0
                              ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                              : "text-gray-400 hover:text-gray-600 dark:text-[#989797] dark:hover:text-gray-300"
                          }`}
                          aria-label={t('moveUpAriaLabel')}
                        >
                          <ChevronUp size={12} />
                        </button>
                        <button
                          onClick={() => moveTimezone(index, "down")}
                          disabled={index === timezones.length - 1}
                          className={`p-1 rounded ${
                            index === timezones.length - 1
                              ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                              : "text-gray-400 hover:text-gray-600 dark:text-[#989797] dark:hover:text-gray-300"
                          }`}
                          aria-label={t('moveDownAriaLabel')}
                        >
                          <ChevronDown size={12} />
                        </button>
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-[#DEE2E2]">{tz.label}</div>
                      <div className="text-xs text-gray-500 dark:text-[#989797]">{tz.timezone}</div>
                    </div>
                  </div>
                  {timezones.length > 1 && (
                    <button
                      onClick={() => removeTimezone(tz.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      aria-label={t('removeTimezoneAriaLabel')}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add New Timezone */}
          {timezones.length < 10 && availableTimezones.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-[#DEE2E2] mb-2">{t('addTimezoneLabel')}</h4>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <select
                    value={selectedTimezone}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                    className="appearance-none w-full px-3 py-2 border border-gray-300 dark:border-[#2D2D2D] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-[#2D2D2D] bg-white dark:bg-[#141415] text-gray-900 dark:text-[#DEE2E2]"
                  >
                    <option value="">{t('selectTimezonePlaceholder')}</option>
                    {availableTimezones.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-[#989797] pointer-events-none"
                  />
                </div>
                <button
                  onClick={addTimezone}
                  disabled={!selectedTimezone}
                  className="px-3 py-2 bg-gray-900 dark:bg-[#FEFEFE] text-white dark:text-[#000000] rounded-lg hover:bg-gray-800 dark:hover:bg-[#E9E9E9] disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={t('addTimezoneAriaLabel')}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-[#2D2D2D] rounded-xl text-gray-700 dark:text-[#DEE2E2] hover:bg-gray-100 dark:hover:bg-[#1C1C1C]"
          >
            {t('cancelButton')}
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 border border-gray-300 dark:border-[#2D2D2D] rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-[#2D2D2D] bg-gray-900 dark:bg-[#FEFEFE] text-white dark:text-[#000000] dark:hover:bg-[#E9E9E9] hover:bg-gray-800"
          >
            {t('saveChangesButton')}
          </button>
        </div>
      </div>
    </div>
  )
}
