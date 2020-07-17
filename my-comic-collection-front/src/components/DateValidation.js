import moment from 'moment' // https://flaviocopes.com/momentjs/

const DateValidation = (date) => {
  // date validated for: format yyyy-mm-dd, yyyy-mm or yyyy,
  //                     Feb 29 in leap years,
  //                     year starting with 19 or 20,
  //                     month not greater than 12,
  //                     day correct for the month & not greater than 31

  const yyyymmdd = moment(date, 'YYYY-MM-DD', true)
  const yyyymm = moment(date, 'YYYY-MM', true)
  const yyyy = moment(date, 'YYYY', true)

  if (yyyymmdd.isValid() || yyyymm.isValid() || yyyy.isValid()) {
      return (
        date.match(/^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/gm) || 
        date.match(/^(19|20)\d{2}-(0[1-9]|1[012])$/gm) ||
        date.match(/^(19|20)\d{2}$/gm) 
      )
  } else return false
  
}

export default DateValidation