import { Users, Heart, Eye, MessageCircle } from 'lucide-react'

interface KpiCardProps {
  label: string
  value: string
  delta?: string
  icon: 'users' | 'heart' | 'eye' | 'message'
  className?: string
}

const iconMap = {
  users: Users,
  heart: Heart,
  eye: Eye,
  message: MessageCircle,
}

export function KpiCard({ label, value, delta, icon, className }: KpiCardProps) {
  const IconComponent = iconMap[icon]
  
  return (
    <div className={`surface p-card ${className}`}>
      <div className="flex items-center justify-between">
        <span className="muted">{label}</span>
        <IconComponent className="w-5 h-5 text-fg-dim" />
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-3xl md:text-4xl font-semibold text-fg-high">{value}</div>
        {delta && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-edge-subtle text-fg-base">
            {delta}
          </span>
        )}
      </div>
    </div>
  )
}
