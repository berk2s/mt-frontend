export const calculateAge = (birthday: Date) => {
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs)

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export const datePrettier = (date: Date) => {
  let d = new Date(date)
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

  return `${da} ${mo} ${ye}`
}

export const ageToBirthday = (age: number) => {
  const now = new Date()
  now.setMonth(1)
  now.setDate(1)

  const birthday = new Date(now.setFullYear(new Date().getFullYear() - age))

  return birthday.getFullYear() + '-12-31'
}
