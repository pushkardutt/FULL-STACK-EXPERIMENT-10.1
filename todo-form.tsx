"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface TodoFormProps {
  onAddTodo: (title: string, description: string) => void
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTodo(title, description)
      setTitle("")
      setDescription("")
      setIsOpen(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {isOpen ? (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            autoFocus
          />

          <textarea
            placeholder="Add details (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-20"
          />

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false)
                setTitle("")
                setDescription("")
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Add Task
            </Button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full px-6 py-4 flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add a new task</span>
        </button>
      )}
    </div>
  )
}
