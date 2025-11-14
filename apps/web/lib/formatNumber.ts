/**
 * Format large numbers into compact form (e.g., 35400 -> "35.4K")
 * Useful for mobile displays where space is limited
 */
export function formatCompactNumber(num: number, decimals: number = 1): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(decimals) + 'M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(decimals) + 'K'
  }
  return num.toLocaleString()
}

/**
 * Format currency with appropriate abbreviation
 */
export function formatCompactCurrency(num: number, decimals: number = 1): string {
  return '$' + formatCompactNumber(num, decimals)
}

