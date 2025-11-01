interface TodoHeaderProps {
  totalCount: number
  completedCount: number
}

export default function TodoHeader({ totalCount, completedCount }: TodoHeaderProps) {
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">My Tasks</h1>
        <p className="text-muted-foreground">
          {completedCount} of {totalCount} completed
        </p>
      </div>

      {totalCount > 0 && (
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </div>
  )
}
