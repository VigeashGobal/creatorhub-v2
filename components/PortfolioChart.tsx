import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const data = [
  { d: 'Jan', value: 4000 },
  { d: 'Feb', value: 3000 },
  { d: 'Mar', value: 2000 },
  { d: 'Apr', value: 2780 },
  { d: 'May', value: 1890 },
  { d: 'Jun', value: 2390 },
  { d: 'Jul', value: 3490 },
]

export function PortfolioChart() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-4xl font-bold text-fg-high mb-1">$24,680</div>
          <div className="muted">Total Portfolio Value</div>
          <div className="text-xs px-2 py-1 rounded-full bg-accent-green/10 text-accent-green mt-2">
            7-Day Growth Streak
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-bg-sunken text-fg-dim rounded-lg text-sm">1M</button>
          <button className="px-3 py-1 bg-bg-sunken text-fg-dim rounded-lg text-sm">3M</button>
          <button className="px-3 py-1 bg-accent-blue text-white rounded-lg text-sm">All</button>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis 
              dataKey="d" 
              tick={{ fill: '#8A93A7', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false} 
            />
            <YAxis 
              tick={{ fill: '#8A93A7', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false} 
            />
            <Tooltip 
              contentStyle={{ 
                background: '#12172A', 
                border: '1px solid rgba(255,255,255,0.06)', 
                borderRadius: 12, 
                color: '#E9EEF7' 
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#5BB6FF" 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-end mt-4">
        <div className="flex items-center px-3 py-2 rounded-lg bg-accent-purple text-white text-sm">
          <span className="font-semibold">+3.1%</span>
        </div>
      </div>
    </div>
  )
}
