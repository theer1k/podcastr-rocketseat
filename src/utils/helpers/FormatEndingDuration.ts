import { intervalToDuration } from 'date-fns'

export default function FormatEndingDuration(ending: number): string {
  if (ending === 0) {
    return '00:00:00'
  }

  const durationCalculated = intervalToDuration({ start: 0, end: ending })

  const formattedHours = String(durationCalculated.hours).padStart(2, '0')
  const formattedMinutes = String(durationCalculated.minutes).padStart(2, '0')
  const formattedSeconds = String(durationCalculated.seconds).padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}
