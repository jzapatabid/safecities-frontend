function getSessionExpirationHashedEpochTime(hours: number) {
  const currentTime = Date.now()
  const hoursInMilliseconds = hours * 60 * 60 * 1000
  const futureTime = currentTime + hoursInMilliseconds
  return {
    sessionExpirationEpochTime: (futureTime + 1).toString(36)
  }
}

function runAtEpochTime(epochTime: number, callback: () => void) {
  const currentTime = Date.now()
  const timeRemaining = epochTime - currentTime
  if (timeRemaining <= 0) {
    callback()
  } else {
    setTimeout(callback, timeRemaining)
  }
}

function unhashEpoch(epoch: string) {
  return parseInt(epoch, 36)
}

function getPaginationPageGroupInfo(currentPage: number) {
  const remainder = currentPage % 5
  let start, end
  if (remainder !== 0) {
    start = currentPage - (remainder - 1)
    end = currentPage + (5 - remainder)
  } else {
    end = currentPage
    start = currentPage - 4
  }
  return { start, end }
}

function getLast12MonthsIncreasingOrder() {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  const months = []
  for (let i = 0; i < 12; i++) {
    const year = currentMonth - i <= 0 ? currentYear - 1 : currentYear
    const month = (currentMonth - i + 12) % 12 || 12

    months.push({
      year: year.toString(),
      month,
      totalCityIncidents: 0
    })
  }

  return months.reverse() // Reverse the array to get increasing order
}

function getLast12MonthsIncreasingOrderFromGivenStartDate(date: string) {
  const currentDate = new Date(date)
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  const months = []
  for (let i = 0; i < 12; i++) {
    const year = currentMonth - i <= 0 ? currentYear - 1 : currentYear
    const month = (currentMonth - i + 12) % 12 || 12

    months.push({
      year: year.toString(),
      month,
      totalCityIncidents: 0
    })
  }

  return months.reverse() // Reverse the array to get increasing order
}

function getLast5YearsQuarters() {
  const currentYear = new Date().getFullYear()
  const quarters = ['q1', 'q2', 'q3', 'q4']

  const result = []
  for (let i = 4; i >= 0; i--) {
    const year = currentYear - i
    for (const quarter of quarters) {
      result.push({
        year: year.toString(),
        quarter,
        totalCityIncidents: 0
      })
    }
  }

  return result
}

function getLast5YearsQuartersFromGivenStartDate(date: string) {
  const currentYear = new Date(date).getFullYear()
  const quarters = ['q1', 'q2', 'q3', 'q4']

  const result = []
  for (let i = 4; i >= 0; i--) {
    const year = currentYear - i
    for (const quarter of quarters) {
      result.push({
        year: year.toString(),
        quarter,
        totalCityIncidents: 0
      })
    }
  }

  return result
}

const formatProblemPerformanceMapData = (
  fillerArray: any[],
  serverDataArray: any[] = []
) => {
  const serverDataMap = new Map()
  serverDataArray.map((item) => {
    const key = item.year + '-' + item.month
    serverDataMap.set(key, item)
  })

  fillerArray.forEach((item) => {
    const key = item.year + '-' + item.month
    if (serverDataMap.has(key)) {
      const serverItem = serverDataMap.get(key)
      item.totalStateIncidents = serverItem.totalStateIncidents
      item.totalCityIncidents = serverItem.totalCityIncidents
    }
  })

  return fillerArray
}

const formatProblemTrendMapData = (
  fillerArray: any[],
  serverDataArray: any[]
) => {
  const serverDataMap = new Map()

  // Create a map of year and quarter values to the corresponding objects in the server data array
  serverDataArray.forEach((item) => {
    const key = item.year + '-' + item.quarter.toUpperCase()
    serverDataMap.set(key, item)
  })

  // Update the filler array with server data where year and quarter values collide
  fillerArray.forEach((item) => {
    item.quarter = item.quarter.toUpperCase()
    const key = item.year + '-' + item.quarter.toUpperCase()
    if (serverDataMap.has(key)) {
      const serverItem = serverDataMap.get(key)
      item.rateCityIncidents = serverItem.rateCityIncidents
      item.totalCityIncidents = serverItem.totalCityIncidents
    }
  })

  return fillerArray
}

function camelToSnake(camelCaseString: string) {
  return camelCaseString?.replace(
    /[A-Z]/g,
    (match) => `_${match.toLowerCase()}`
  )
}

function getLastYearRangeInPortuguese(date?: string) {
  if (date === 'NA') {
    return '-'
  }

  let lastYearStart
  const today = date ? new Date(date + 'T00:00:00') : new Date()

  // Exception case check
  if (today.getMonth() === 11) {
    lastYearStart = new Date(today)
    lastYearStart.setMonth(0)
  } else {
    lastYearStart = new Date(today)
    lastYearStart.setFullYear(today.getFullYear() - 1)
  }
  const lastYearEnd = new Date(today)

  // Define an array of month names in Portuguese
  const monthNames = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
  ]

  // Format the start and end months
  const startMonth =
    monthNames[
      lastYearStart.getMonth() === 0 && today.getMonth() !== 0
        ? lastYearStart.getMonth()
        : lastYearStart.getMonth() + 1
    ]
  const endMonth = monthNames[lastYearEnd.getMonth()]

  // Get the year of the start and end months
  const startYear = lastYearStart.getFullYear()
  const endYear = lastYearEnd.getFullYear()

  // Format the result
  const result = `${startMonth}/${startYear} - ${endMonth}/${endYear}`
  return result
}

function formatNumberToLatinAmerican(value: number): number | string {
  if (isNaN(value as number)) {
    return ''
  }

  const [integerPart, decimalPart] = Number(value)
    .toFixed(2)
    .toString()
    .split('.')

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const formattedDecimalPart = decimalPart.replace(/0+$/, '')

  const formattedNumber = formattedDecimalPart.length
    ? `${formattedIntegerPart}.${formattedDecimalPart}`
    : formattedIntegerPart

  return formattedNumber
}

export {
  getSessionExpirationHashedEpochTime,
  runAtEpochTime,
  unhashEpoch,
  getPaginationPageGroupInfo,
  getLast12MonthsIncreasingOrder,
  formatProblemPerformanceMapData,
  getLast5YearsQuarters,
  formatProblemTrendMapData,
  camelToSnake,
  getLastYearRangeInPortuguese,
  formatNumberToLatinAmerican,
  getLast5YearsQuartersFromGivenStartDate,
  getLast12MonthsIncreasingOrderFromGivenStartDate
}
