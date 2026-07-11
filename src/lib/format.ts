/* Number & currency formatting — pt-BR, mirrors the prototype's fmt/num. */

/** Format a number as Brazilian Real currency. */
export function fmt(n: number, decimals = 0): string {
  return Number(n).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** Format a plain number with pt-BR grouping. */
export function num(n: number, decimals = 0): string {
  return Number(n).toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** MW label, e.g. "3,2 MW". */
export function mw(value: number): string {
  return `${num(value, 1)} MW`
}

/** Initials from a company / person name (first two words). */
export function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

/** Current time as HH:MM in pt-BR. */
export function nowHM(): string {
  return new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
