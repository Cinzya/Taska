"use client"

import { useMemo } from "react"
import { useTranslations } from "next-intl"
import type { Task } from "@/lib/types"
import { isOverdue } from "@/lib/utils"

interface TaskStatsProps {
  tasks: Task[]
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const t = useTranslations('TaskStats')
  const stats = useMemo(() => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task) => task.completed).length
    const notCompletedTasks = tasks.filter((task) => !task.completed).length
    const overdueTasks = tasks.filter((task) => !task.completed && isOverdue(task.deadline)).length

    return {
      totalTasks,
      completedTasks,
      notCompletedTasks,
      overdueTasks,
    }
  }, [tasks])

  return (
    <div className="bg-white dark:bg-[#141415] rounded-lg shadow-sm border border-gray-200 dark:border-[#2D2D2D] overflow-hidden">
      <div className="px-5 py-2 flex justify-between items-center bg-[#F5F5F5] dark:bg-[#1C1C1C]">
        <h2 className="text-base font-sm text-gray-400 dark:text-[#989797]">{t('title')}</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-gray-100 dark:border-[#2D2D2D]">
        {[
          {
            label: t('overdue'),
            value: stats.overdueTasks,
            color: "text-red-500 dark:text-red-400",
          },
          {
            label: t('notCompleted'),
            value: stats.notCompletedTasks,
            color: "text-orange-500 dark:text-yellow-400",
          },
          {
            label: t('completed'),
            value: stats.completedTasks,
            color: "text-green-500 dark:text-green-400",
          },
          {
            label: t('totalTasks'),
            value: stats.totalTasks,
            color: "text-gray-800 dark:text-[#DEE2E2]",
          },
        ].map(({ label, value, color }, idx) => (
          <div
            key={label}
            className={`px-5 py-4 text-center border-gray-100 dark:border-[#2D2D2D] ${
              idx < 2 ? "border-b sm:border-b-0" : ""
            } ${idx !== 3 && "sm:border-r"}`}
          >
            <div className="text-sm text-gray-600 dark:text-[#989797] break-words">{label}</div>
            <div className={`text-lg font-medium ${color}`}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
