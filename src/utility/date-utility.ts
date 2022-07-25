export const calculateAge = (birthday: Date) => {
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs)

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export const datePrettier = (date: Date) => {
  let d = new Date(2010, 7, 5)
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

  return `${da} ${mo} ${ye}`
}
