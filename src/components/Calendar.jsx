// Calendar renders the current month, recurring Thursdays, one-off events, and event detail dialogs.
import { useEffect, useState } from 'react'
import { events, noMeetingDates, noMeetingRanges, weeklyMeeting } from '../data/events.js'

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })
const fullDateFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' })

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function getEventsForDate(date) {
  const key = dateKey(date)
  const oneOff = events.filter((event) => event.date === key)
  const canceled = noMeetingDates.includes(key) || noMeetingRanges.some(({ start, end }) => key >= start && key <= end)
  const hasWeeklyMeeting = date.getDay() === weeklyMeeting.weekday && !canceled
  return [...(hasWeeklyMeeting ? [{ ...weeklyMeeting, date: key }] : []), ...oneOff]
}

function Calendar() {
  const today = new Date()
  const todayKey = dateKey(today)
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    if (!selectedEvent) return undefined
    function closeOnEscape(event) {
      if (event.key === 'Escape') setSelectedEvent(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedEvent])

  const firstDay = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1)
  const gridStart = new Date(firstDay)
  gridStart.setDate(firstDay.getDate() - ((firstDay.getDay() + 6) % 7))
  const dayCells = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)
    return date
  })

  function moveMonth(amount) {
    setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + amount, 1))
  }

  function returnToToday() {
    setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1))
  }

  return (
    <section className="calendar-panel" aria-label="Team calendar">
      <div className="calendar-heading">
        <div>
          <h2>Team calendar</h2>
          <p className="calendar-caption">Weekly Thursday meetings and upcoming team events. Select an event for details.</p>
        </div>
        <div className="calendar-month-controls">
          <button type="button" onClick={() => moveMonth(-1)} aria-label="Previous month">‹</button>
          <strong aria-live="polite">{monthFormatter.format(visibleMonth)}</strong>
          <button type="button" onClick={() => moveMonth(1)} aria-label="Next month">›</button>
          <button type="button" className="today-button" onClick={returnToToday}>Today</button>
        </div>
      </div>
      <div key={dateKey(firstDay)} className="calendar-grid" role="grid" aria-label={monthFormatter.format(visibleMonth)}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <div className="calendar-weekday" role="columnheader" key={day}>{day}</div>)}
        {dayCells.map((date) => {
          const key = dateKey(date)
          const dayEvents = getEventsForDate(date)
          const isToday = key === todayKey
          const inMonth = date.getMonth() === visibleMonth.getMonth()
          return (
            <div className={`calendar-day${inMonth ? '' : ' is-outside'}${isToday ? ' is-today' : ''}${dayEvents.length ? ' has-event' : ''}`} role="gridcell" aria-label={`${weekdayFormatter.format(date)}, ${fullDateFormatter.format(date)}${isToday ? ', today' : ''}`} key={key}>
              <span className="calendar-date">{date.getDate()}</span>
              {dayEvents.map((event, index) => (
                <button type="button" className="calendar-event" key={`${key}-${event.title}-${index}`} onClick={() => setSelectedEvent({ ...event, date: key })} aria-label={`${event.title}, ${fullDateFormatter.format(date)}. View details`}>
                  {event.title}
                </button>
              ))}
            </div>
          )
        })}
      </div>

      {selectedEvent && (
        <div className="event-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedEvent(null) }}>
          <section className="event-modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title">
            <button type="button" className="event-modal-close" onClick={() => setSelectedEvent(null)} aria-label="Close event details">×</button>
            <h2 id="event-modal-title">{selectedEvent.title}</h2>
            <dl>
              <dt>Date</dt><dd>{fullDateFormatter.format(new Date(`${selectedEvent.date}T12:00:00`))}</dd>
              {selectedEvent.time && <><dt>Time</dt><dd>{selectedEvent.time}</dd></>}
              {selectedEvent.location && <><dt>Location</dt><dd>{selectedEvent.location}</dd></>}
              <dt>Description</dt><dd>{selectedEvent.description || 'No additional details have been added yet.'}</dd>
            </dl>
          </section>
        </div>
      )}
    </section>
  )
}

export default Calendar
