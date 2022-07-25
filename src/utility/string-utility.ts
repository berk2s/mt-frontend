export const capitalizeFirstLetter = (text: string) => {
  return (
    text.toLowerCase().charAt(0).toUpperCase() + text.toLowerCase().slice(1)
  )
}
