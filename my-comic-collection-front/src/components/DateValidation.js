import moment from 'moment' // https://flaviocopes.com/momentjs/

const DateValidation = (date) => {
  // date validated for: yyyy and a valid year

  const yyyy = moment(date, 'YYYY', true)

  if (yyyy.isValid()) {
      return (
        date.match(/^(19|20)\d{2}$/gm) 
      )
  } else return false
  
}

export default DateValidation