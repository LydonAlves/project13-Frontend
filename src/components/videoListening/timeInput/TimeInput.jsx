import { useState } from 'react'
import "./TimeInput.css"

const TimeInput = ({ title, time, setTime }) => {
  const [unblockTimeInput, setUnlockTimeInput] = useState(true)

  const handleTimeChange = (e) => {
    let input = e.target.value.replace(/[^0-9]/g, ' ')
    input = input.replace(/^0*(?=\d)/, '').replace(/^[^1-9]+/, '').replace(/\s+/g, '');

    let minutes = '';
    let seconds = '';

    if (input.length <= 2) {
      seconds = input.padStart(2, '0');
    } else if (input.length <= 3) {
      seconds = input.slice(1, 3);
      minutes = input.slice(0, 1).padStart(1, '0');
      setUnlockTimeInput(true)
    } else if (input.length <= 4) {
      seconds = input.slice(2, 4);
      minutes = input.slice(0, 2).padStart(1, '0');
      setUnlockTimeInput(false)
    }
    if (unblockTimeInput) {
      setTime(minutes === "00" && seconds === "00" ? "" : `${minutes}: ${seconds}`)
    }

  }

  return (
    <div className='timeInputDiv'>
      <p className='timeTitle'>{title}</p>
      <input
        value={time}
        onChange={handleTimeChange}
        placeholder="00:00"
        className='timeInput'
      />
    </div >
  )
}

export default TimeInput