import { useState } from 'react'
import { texts } from '../../../initialData/Text'
import TextsToChooseFrom from '../../components/fillGapForm/TextsToChooseFrom'
import GapFill from './GapFill'

const GapFillOpen = () => {
  const [chosenText, setChosenText] = useState("")

  // console.log(typeof chosenText);
  return (
    <div>
      {chosenText !== "" && (
        <GapFill
          chosenText={chosenText}
          setChosenText={setChosenText}
        />
      )}
      {chosenText === "" && (
        <TextsToChooseFrom
          setChosenText={setChosenText}
          texts={texts}
        />
      )}
    </div>
  )
}


//! If I don't see any errors i can delete this file

// export default GapFillOpen