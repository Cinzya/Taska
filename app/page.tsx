"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Filter, X } from "lucide-react"
import TaskModal from "@/components/task-modal"
import TaskStats from "@/components/task-stats"
import InfoSection from "@/components/info-section"
import UserGreeting from "@/components/user-greeting"
import DeleteConfirmModal from "@/components/delete-confirm-modal"
import UserNameModal from "@/components/user-name-modal"
import { ThemeProvider } from "@/components/theme-provider"
import type { Task } from "@/lib/types"
import { formatRelativeTime, isOverdue } from "@/lib/utils"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isUserNameModalOpen, setIsUserNameModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)
  const [hoveredTask, setHoveredTask] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>("")

  // Search and filter states
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "completed" | "not-completed" | "due">("all")
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }

    const storedUserName = localStorage.getItem("userName")
    if (storedUserName) {
      setUserName(storedUserName)
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // Save userName to localStorage whenever it changes
  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName)
    }
  }, [userName])

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task])
    setIsModalOpen(false)
  }

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setEditingTask(null)
  }

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    setIsDeleteModalOpen(false)
    setTaskToDelete(null)
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : undefined,
            }
          : task,
      ),
    )
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  const handleDeleteTask = (id: string) => {
    setTaskToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const handleUpdateUserName = (newName: string) => {
    setUserName(newName)
    setIsUserNameModalOpen(false)
  }

  const clearFilter = () => {
    setFilterType("all")
    setIsFilterDropdownOpen(false)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearchExpanded(false)
  }

  // Filter and search tasks
  const filteredTasks = tasks.filter((task) => {
    // Apply search filter
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply completion filter
    let matchesFilter = true
    if (filterType === "completed") {
      matchesFilter = task.completed
    } else if (filterType === "not-completed") {
      matchesFilter = !task.completed
    } else if (filterType === "due") {
      matchesFilter = isOverdue(task.deadline) && !task.completed
    }

    return matchesSearch && matchesFilter
  })

  // Sort tasks: incomplete first (by deadline), then completed
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // First, separate completed and incomplete tasks
    if (a.completed && !b.completed) return 1
    if (!a.completed && b.completed) return -1

    // Then sort by deadline
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  })

  const isReturningUser = tasks.length > 0 || userName

  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#FFFFFF] dark:bg-[#141415]">
        <div className="w-full max-w-2xl space-y-8">
          {/* User Greeting */}
          <UserGreeting
            userName={userName}
            isReturningUser={isReturningUser}
            onEditClick={() => setIsUserNameModalOpen(true)}
          />

          {/* Info Section */}
          <InfoSection />

          {/* Tasks Section */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-[#2D2D2D]">
            <div className="px-5 py-2 flex justify-between text-gray-400 items-center bg-[#F5F5F5] dark:bg-[#1C1C1C] dark:text-[#989797]">
              <h2 className="
                ">Tasks</h2>
              <div className="flex items-center space-x-4">
                {/* Search */}
                {isSearchExpanded ? (
                  <div className="flex items-center space-x-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tasks..."
                      className="w-62 h-6 px-2 py-1 text-sm border border-gray-300 dark:border-[#2D2D2D] rounded-md bg-white dark:bg-[#141415] text-gray-900 dark:text-[#DEE2E2] focus:outline-none focus:ring-1 dark:focus:ring-gray-700 focus:ring-gray-200"
                      autoFocus
                    />
                    <button
                      onClick={clearSearch}
                      className="text-gray-400 hover:text-gray-600 dark:text-[#989797] dark:hover:text-gray-300"
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchExpanded(true)}
                    className="text-gray-400 hover:text-gray-600 dark:text-[#989797] dark:hover:text-gray-300"
                    aria-label="Search tasks"
                  >
                    <Search size={17} className="relative bottom-[1px]" />
                  </button>
                )}

                {/* Filter */}
                <div className="relative">
                  <button
                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                    className={`text-gray-400 hover:text-gray-600 dark:text-[#989797] dark:hover:text-gray-300 relative ${
                      filterType !== "all" ? "text-green-500 dark:text-green-500" : ""
                    }`}
                    aria-label="Filter tasks"
                  >
                    <Filter size={16} className="relative top-[2px]" />
                    {filterType !== "all" && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </button>

                  {isFilterDropdownOpen && (
                    <div className="absolute right-0 top-8 z-50 bg-white dark:bg-[#141415] border border-gray-200 dark:border-[#2D2D2D] rounded-lg shadow-lg py-1 min-w-[160px]">
                      <button
                        onClick={() => {
                          setFilterType("completed")
                          setIsFilterDropdownOpen(false)
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-[#DEE2E2] hover:bg-gray-100 dark:hover:bg-[#1C1C1C]"
                      >
                        Show completed
                      </button>
                      <button
                        onClick={() => {
                          setFilterType("not-completed")
                          setIsFilterDropdownOpen(false)
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-[#DEE2E2] hover:bg-gray-100 dark:hover:bg-[#1C1C1C]"
                      >
                        Show not completed
                      </button>
                      <button
                        onClick={() => {
                          setFilterType("due")
                          setIsFilterDropdownOpen(false)
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-[#DEE2E2] hover:bg-gray-100 dark:hover:bg-[#1C1C1C]"
                      >
                        Show due tasks
                      </button>
                      {filterType !== "all" && (
                        <button
                          onClick={clearFilter}
                          className="w-full px-3 py-2 text-left text-sm text-gray-500 dark:text-[#DEE2E2] hover:bg-gray-100 dark:hover:bg-[#1C1C1C] border-t border-gray-200 dark:border-[#2D2D2D]"
                        >
                          Clear filter
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Add Task */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-gray-400 hover:text-gray-600 dark:text-[#989797] dark:hover:text-gray-300"
                  aria-label="Add task"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {sortedTasks.length === 0 ? (
                <div className="px-5 py-4 text-center text-sm text-gray-400 dark:bg-[#141415] dark:text-[#989797] border-t border-gray-100 dark:border-[#2D2D2D]">
                  {searchQuery || filterType !== "all"
                    ? "No tasks match your criteria."
                    : "No tasks yet. Click + to add one."}
                </div>
              ) : (
                sortedTasks.map((task, index) => {
                  const overdue = isOverdue(task.deadline) && !task.completed
                  return (
                    <div
                      key={task.id}
                      className={`px-5 py-4 flex justify-between items-center border-t border-gray-100 dark:border-[#2D2D2D] hover:bg-gray-100 dark:bg-[#141415] dark:hover:bg-[#1C1C1C] group ${
                        index >= 10 ? "border-t" : ""
                      }`}
                      onMouseEnter={() => setHoveredTask(task.id)}
                      onMouseLeave={() => setHoveredTask(null)}
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-[#303030] appearance-none bg-white dark:bg-[#141415] cursor-pointer focus:outline-none"
                          />
                          {task.completed && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-4 h-4 rounded-full bg-blue-500 dark:bg-green-600 flex items-center justify-center">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white">
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        <span
                          className={`${
                            task.completed
                              ? "line-through text-gray-400 dark:text-[#989797]"
                              : overdue
                                ? "text-red-500 dark:text-red-400"
                                : "text-gray-700 dark:text-[#DEE2E2]"
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div
                          className={`text-sm ${
                            overdue ? "text-red-500 dark:text-red-400" : "text-gray-400 dark:text-[#989797]"
                          }`}
                        >
                          {formatRelativeTime(task.deadline)}
                        </div>
                        {hoveredTask === task.id && (
                          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEditTask(task)}
                              className="p-1 text-gray-400 hover:text-blue-500 dark:text-[#989797] dark:hover:text-blue-400"
                              aria-label="Edit task"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-1 text-gray-400 hover:text-red-500 dark:text-[#989797] dark:hover:text-red-400"
                              aria-label="Delete task"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Task Stats Section */}
          <TaskStats tasks={tasks} />
        </div>

        {/* Modals */}
        {(isModalOpen || editingTask) && (
          <TaskModal
            onClose={() => {
              setIsModalOpen(false)
              setEditingTask(null)
            }}
            onAdd={addTask}
            onUpdate={updateTask}
            editingTask={editingTask}
          />
        )}

        {isDeleteModalOpen && taskToDelete && (
          <DeleteConfirmModal
            onClose={() => {
              setIsDeleteModalOpen(false)
              setTaskToDelete(null)
            }}
            onConfirm={() => deleteTask(taskToDelete)}
            taskTitle={tasks.find((t) => t.id === taskToDelete)?.title || ""}
          />
        )}

        {isUserNameModalOpen && (
          <UserNameModal
            onClose={() => setIsUserNameModalOpen(false)}
            onUpdate={handleUpdateUserName}
            currentName={userName}
          />
        )}

        {/* Click outside to close filter dropdown */}
        {isFilterDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsFilterDropdownOpen(false)} />}
      </main>
    </ThemeProvider>
  )
}
