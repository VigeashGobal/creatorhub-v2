interface PillProps {
  children: React.ReactNode
  tone?: 'blue' | 'yellow'
}

function Pill({ children, tone = 'blue' }: PillProps) {
  const tones = {
    yellow: 'bg-[rgba(255,200,61,0.1)] text-[#FFC83D]',
    blue: 'bg-[rgba(91,182,255,0.12)] text-[#5BB6FF]',
  }
  return (
    <span className={`text-[11px] px-2.5 py-1 rounded-full ring-1 ring-edge-subtle ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function HeroScore() {
  return (
    <div>
      <p className="muted mb-2">Score</p>
      <div className="flex items-end gap-3">
        <div className="text-5xl md:text-6xl font-semibold text-fg-high">83</div>
        <div className="flex gap-2 mb-1">
          <Pill tone="blue">Expert</Pill>
          <Pill tone="yellow">Top 5%</Pill>
        </div>
      </div>
      <h3 className="h2 mt-4">Strong performance</h3>
      <p className="body mt-2 max-w-prose">
        Review overdue payments, optimize posting times, and clear remaining action items for today.
      </p>
    </div>
  )
}
