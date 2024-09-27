// generate an array of new Date from weather report
const generateDateFromTxt = (array) => {
    const newDateArr = [];
    for (const date of array) {
      const newDate = new Date(date).toDateString();
      if (!newDateArr.includes(newDate)) {
        newDateArr.push(newDate);
      }
    }
    return newDateArr;
};

const parseDate = (val) => {
    let newDate;
    newDate = new Date(val).toDateString();
    return newDate;
};
  
const convertKelvinToCelcius = (kelvin) => {
  return ((kelvin - 273.15).toFixed(2) + '°C');
}

const convertDateToDay = (date) => {
  const newDate = new Date(date).toString().slice(0, 3);
  let result = '';
  if (newDate.length === 3) {
    switch (newDate) {
      case 'Mon':
        result = 'Monday';
        break;
      case 'Tue':
        result = 'Tuesday';
        break;
      case 'Wed':
        result = 'Wednesday';
        break;
      case 'Thu':
        result = 'Thursday';
        break;
      case 'Fri':
        result = 'Friday';
        break;
      case 'Sat':
        result = 'Saturday';
        break;
      case 'Sun':
        result = 'Sunday';
        break;
      default:
        break;
    }
  } 
  return result
}

const convertMsToKh = (val) => {
  val = val * (60 * 60 / 1000);
  return val.toFixed(2)

}
 
  

export { generateDateFromTxt, parseDate, convertKelvinToCelcius, convertDateToDay, convertMsToKh };