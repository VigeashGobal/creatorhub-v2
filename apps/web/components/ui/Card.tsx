interface CardProps {
  className?: string
  children: React.ReactNode
}

export function Card({ className = '', children }: CardProps) {
  return <div className={`surface p-card ${className}`}>{children}</div>
}

