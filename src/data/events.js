// Calendar.jsx adds a meeting every Thursday automatically and merges these one-off events.
// Use YYYY-MM-DD local dates. Every event should include a description for the details modal.
export const weeklyMeeting = {
  weekday: 4, // JavaScript weekday numbering: Sunday = 0, Thursday = 4.
  title: 'Club Meeting',
  time: '1:50 PM',
  location: 'J210',
  description: 'Woah its a weekly robotics meeting',
}

export const events = [
  { date: '2026-11-15', title: 'California Advocacy Leadership Conference Day 1', time: '9:00 AM', location: 'Capitol Building, Sacramento', description: 'First day of the California Advocacy Leadership Conference.' },
  { date: '2026-11-16', title: 'California Advocacy Leadership Conference Day 2', time: '9:00 AM', location: 'Capitol Building, Sacramento', description: 'Second day of the California Advocacy Leadership Conference.' },
  { date: '2026-12-06', title: 'Meet 2', time: '7:00 AM', location: 'Acalanes High School', description: 'FTC league meet.' },
  { date: '2027-01-09', title: 'Meet 3', time: '7:00 AM', location: 'Berean Christian High School', description: 'FTC league meet.' },
  { date: '2027-01-31', title: 'Meet 4', time: '7:00 AM', location: 'Piedmont Middle School', description: 'FTC league meet.' },
]

// Cancel one meeting by adding its date here.
export const noMeetingDates = [
  //'2026-11-26', //like, we need to order parts or something
]

// Date ranges are inclusive. 
export const noMeetingRanges = [
  { start: '2026-11-21', end: '2026-11-29', reason: 'Thanksgiving break' },
  { start: '2026-12-19', end: '2027-01-05', reason: 'Winter break' },
]
