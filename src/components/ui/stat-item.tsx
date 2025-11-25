'use client'

interface StatItemProps {
  label: string
  value: number
  mobileLabel?: string
}

export function StatItem({ label, value, mobileLabel }: StatItemProps) {
  return (
    <span>
      <span className={mobileLabel ? "hidden sm:inline" : ""}>{label}</span>
      {mobileLabel && <span className="sm:hidden">{mobileLabel}</span>}
      : <span className="text-white font-medium">{value}</span>
    </span>
  )
}