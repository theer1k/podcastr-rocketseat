import { intervalToDuration } from 'date-fns'

export default function FormatStartingDuration(starting: number): string {
  if (starting === 0) {
    return '00:00:00'
  }

  const durationCalculated = intervalToDuration({ start: starting, end: 0 })

  const formattedHours = String(durationCalculated.hours).padStart(2, '0')
  const formattedMinutes = String(durationCalculated.minutes).padStart(2, '0')
  const formattedSeconds = String(durationCalculated.seconds).padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}
