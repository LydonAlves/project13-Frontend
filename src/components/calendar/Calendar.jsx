import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import "./Calendar.css"

const Calendar = ({ dispatch }) => {
  const [startDate, setStartDate] = useState(new Date())

  useEffect(() => {
    dispatch({ type: 'SET_CLASSES_FOR_DAY', payload: [] })
    dispatch({ type: 'SET_DATE_SELECTED', payload: startDate })
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