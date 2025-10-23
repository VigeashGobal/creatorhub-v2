import { BarChart3, ArrowUp, ArrowDown } from 'lucide-react'

const platformData = [
  { platform: 'Instagram', percentage: 62, change: '+2.3%', trend: 'up', followers: '125K', engagement: '8.5%' },
  { platform: 'TikTok', percentage: 78, change: '+5.1%', trend: 'up', followers: '89K', engagement: '12.3%' },
  { platform: 'YouTube', percentage: 55, change: '-1.4%', trend: 'down', followers: '45K', engagement: '6.2%' },
  { platform: 'Snap', percentage: 43, change: '-3.2%', trend: 'down', followers: '23K', engagement: '4.1%' },
]

export function RevenueSummary() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart3 className="w-6 h-6 text-accent-blue mr-3" />
          <h3 className="h2">Revenue Summary</h3>
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue ring-1 ring-edge-subtle">
          $30K Target
        </div>
      </div>
      
      <div className="space-y-4">
        {platformData.map((platform, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="body font-semibold text-fg-high mr-2">
                    {platform.percentage}% {platform.platform}
                  </span>
                  <span className="muted">
                    {platform.followers} • {platform.engagement}
                  </span>
                </div>
                <div className="flex items-center">
                  {platform.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4 text-accent-green mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-accent-pink mr-1" />
                  )}
                  <span className={`text-xs font-semibold ${
                    platform.trend === 'up' ? 'text-accent-green' : 'text-accent-pink'
                  }`}>
                    {platform.change}
                  </span>
                </div>
              </div>
              <div className="w-full bg-bg-sunken rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    platform.percentage > 60 ? 'bg-accent-blue' : 'bg-accent-purple'
                  }`}
                  style={{ width: `${platform.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
