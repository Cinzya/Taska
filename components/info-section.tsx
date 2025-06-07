"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Clock } from "lucide-react"
import { useTheme } from "./theme-provider"
import TimezoneModal from "./timezone-modal"

interface TimezoneInfo {
  id: string
  timezone: string
  label: string
}

export default function InfoSection() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [timezones, setTimezones] = useState<TimezoneInfo[]>([
    {
      id: "1",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      label: Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[1] || "Local",
    },
  ])
  const [isTimezoneModalOpen, setIsTimezoneModalOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Load timezones from localStorage
    const storedTimezones = localStorage.getItem("timezones")
    if (storedTimezones) {
      setTimezones(JSON.parse(storedTimezones))
    }

    return () => clearInterval(timer)
  }, [])

  // Save timezones to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("timezones", JSON.stringify(timezones))
  }, [timezones])

  const formatTime = (date: Date, timezone: string) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
    })
  }

  const formatDay = (date: Date, timezone: string) => {
    return date.toLocaleDateString([], {
      weekday: "long",
      timeZone: timezone,
    })
  }

  const formatDateOnly = (date: Date, timezone: string) => {
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      timeZone: timezone,
    })
  }

  const updateTimezones = (newTimezones: TimezoneInfo[]) => {
    setTimezones(newTimezones)
    setIsTimezoneModalOpen(false)
  }

  return (
    <>
      <div className="bg-white dark:bg-[#141415] rounded-lg shadow-sm border border-gray-200 dark:border-[#2D2D2D] overflow-hidden">
        <div className="px-5 py-1 flex justify-between items-center bg-[#F5F5F5] dark:bg-[#1C1C1C]">
          <h2 className="text-base font-sm text-gray-400 dark:text-[#989797]">Time</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsTimezoneModalOpen(true)}
              className="px-1 py-2 text-gray-400 hover:text-gray-600 dark:text-[#989797] dark:hover:text-[#989797] rounded-lg hover:bg-gray-100 dark:hover:bg-[#2D2D2D]"
              aria-label="Manage timezones"
            >
              <Clock size={18} />
            </button>
            <button
              onClick={toggleTheme}
              className="px-1 py-2 text-gray-400 hover:text-gray-600 dark:text-[#989797] dark:hover:text-[#989797] rounded-lg hover:bg-gray-100 dark:hover:bg-[#2D2D2D]"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-[#2D2D2D] max-h-80 overflow-y-auto">
          {timezones.slice(0, 5).map((tz, index) => (
            <div key={tz.id} className={`flex ${index > 0 ? "border-t border-gray-100 dark:border-[#2D2D2D]" : ""}`}>
              <div className="flex-1 px-5 py-4 text-center border-r border-gray-100 dark:border-[#2D2D2D]">
                <div className="text-sm text-gray-400 dark:text-[#989797]">Time</div>
                <div className="text-sm font-medium text-cyan-600 dark:text-[#DEE2E2]">
                  {formatTime(currentTime, tz.timezone)}
                </div>
              </div>
              <div className="flex-1 px-5 py-4 text-center border-r border-gray-100 dark:border-[#2D2D2D]">
                <div className="text-sm text-gray-400 dark:text-[#989797]">Day</div>
                <div className="text-sm font-medium text-cyan-600 dark:text-[#DEE2E2]">
                  {formatDay(currentTime, tz.timezone)}
                </div>
              </div>
              <div className="flex-1 px-5 py-4 text-center border-r border-gray-100 dark:border-[#2D2D2D]">
                <div className="text-sm text-gray-400 dark:text-[#989797]">Date</div>
                <div className="text-sm font-medium text-cyan-600 dark:text-[#DEE2E2]">
                  {formatDateOnly(currentTime, tz.timezone)}
                </div>
              </div>
              <div className="flex-1 px-5 py-4 text-center">
                <div className="text-sm text-gray-400 dark:text-[#989797]">Timezone</div>
                <div className="text-sm font-medium text-cyan-600 dark:text-[#DEE2E2]">{tz.label}</div>
              </div>
            </div>
          ))}

          {timezones.length > 5 && (
            <div className="border-t border-gray-100 dark:border-[#2D2D2D] max-h-40 overflow-y-auto">
              {timezones.slice(5).map((tz, index) => (
                <div key={tz.id} className="flex border-t border-gray-100 dark:border-[#2D2D2D]">
                  <div className="flex-1 px-5 py-4 text-center border-r border-gray-100 dark:border-[#2D2D2D]">
                    <div className="text-sm text-gray-400 dark:text-[#989797]">Time</div>
                    <div className="text-sm font-medium text-cyan-600 dark:text-[#DEE2E2]">
                      {formatTime(currentTime, tz.timezone)}
                    </div>
                  </div>
                  <div className="flex-1 px-5 py-4 text-center border-r border-gray-100 dark:border-[#2D2D2D]">
                    <div className="text-sm text-gray-400 dark:text-[#989797]">Day</div>
                    <div className="text-sm font-medium text-cyan-600 dark:text-[#DEE2E2]">
                      {formatDay(currentTime, tz.timezone)}
                    </div>
                  </div>
                  <div className="flex-1 px-5 py-4 text-center border-r border-gray-100 dark:border-[#2D2D2D]">
                    <div className="text-sm text-gray-400 dark:text-[#989797]">Date</div>
                    <div className="text-sm font-medium text-cyan-600 dark:text-[#DEE2E2]">
                      {formatDateOnly(currentTime, tz.timezone)}
                    </div>
                  </div>
                  <div className="flex-1 px-5 py-4 text-center">
                    <div className="text-sm text-gray-400 dark:text-[#989797]">Timezone</div>
                    <div className="text-sm font-medium text-cyan-600 dark:text-[#DEE2E2]">{tz.label}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isTimezoneModalOpen && (
        <TimezoneModal
          onClose={() => setIsTimezoneModalOpen(false)}
          onUpdate={updateTimezones}
          currentTimezones={timezones}
        />
      )}
    </>
  )
}
