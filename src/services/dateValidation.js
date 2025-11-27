 const validateDates = (startDate, endDate) => {
  const errors = {}
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (start < today) {
    errors.startDate = 'Start date cannot be in the past'
  }

  if (end < start) {
    errors.endDate = 'End date must be after start date'
  }

  return errors
}

export default validateDates;