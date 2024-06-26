import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import "./Calendar.css"

const Calendar = ({ setDateSelected, setClassesForDay }) => {
  const [startDate, setStartDate] = useState(new Date())
  useEffect(() => {
    setClassesForDay(null)
    setDateSelected(startDate)
  }, [startDate])

  return (
    <div className='calendarDiv'>
      <ReactDatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
      />
    </div>
  )
}

export default Calendar