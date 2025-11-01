"use client"

import { useState, useEffect } from "react"
import TodoHeader from "@/components/todo-header"
import TodoForm from "@/components/todo-form"
import TodoList from "@/components/todo-list"

export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: number
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos))
      } catch (error) {
        console.error("Failed to load todos:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos, isLoading])

  const addTodo = (title: string, description: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos([newTodo, ...todos])
  }

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <TodoHeader totalCount={todos.length} completedCount={completedCount} />
        <div className="mt-8 space-y-6">
          <TodoForm onAddTodo={addTodo} />
          <TodoList
            todos={todos}
            onToggleComplete={toggleComplete}
            onUpdateTodo={updateTodo}
            onDeleteTodo={deleteTodo}
          />
        </div>
      </div>
    </main>
  )
}
