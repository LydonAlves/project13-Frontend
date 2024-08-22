import { useContext, useEffect, useReducer, useState } from "react"
import "./PreviousSpeakingCorrections.css"
import { DateContext, formatDate } from "../../context/DateContext"
import CarrouselOfItemsButtons from "../../components/carrouselOfItemsButtons/CarrouselOfItemsButtons"
import { useAuth } from './../../context/AuthContext';
import SpeakingCorrections from "../../components/speakingCorrections/SpeakingCorrections"
import Loading from "../../components/loading/Loading"
import PageExplanation from "../../components/pageExplanation/PageExplanation"
import { infoForPageExplanation } from "../../components/pageExplanation/infoForexplanations/infoForExplanations"
import { formatUserFriendlyDate } from "../../utils/formatUserFriendlyDate"
import { INITIAL_SPEAKING_CORRECTIONS, speakingCorrectionsReducer } from "../../reducers/previousSpeakingCorrectionsReducer";
import { fetchCorrections } from "../../functions/audioRecorderFunctions/fetchCorrections";


// For fetchCorrections
//! I have to see if I need to set up a way to distinguish between todaysCorrections and corrections in general
//? I need to compare the practice and jus the view of the corrections


const PreviousSpeakingCorrections = () => {
  const { userObj } = useAuth()
  const date = useContext(DateContext)
  const [stateSpeakingCorrections, dispatchSpeakingCorrections] = useReducer(speakingCorrectionsReducer, INITIAL_SPEAKING_CORRECTIONS)
  const { allSpeakingCorrections, lastTenResults, dateOfCorrections, currentItemIndex } = stateSpeakingCorrections
  const answersToShow = lastTenResults[currentItemIndex];
  const [needHelp, setNeedHelp] = useState(false)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (userObj) {
      console.log("working");
      setLoading(true)
      fetchCorrections(dispatchSpeakingCorrections, date, userObj)
      setLoading(false)
    }
  }, [userObj])

  useEffect(() => {
    if (allSpeakingCorrections.length > 0) {
      const lastTenItems = allSpeakingCorrections.slice(-10);
      dispatchSpeakingCorrections({ type: 'SET_LAST_TEN_RESULTS', payload: lastTenItems })
    }
  }, [allSpeakingCorrections])

  useEffect(() => {
    if (answersToShow) {
      let chosenDate = formatDate(answersToShow.date)
      let userFriendlyDate = formatUserFriendlyDate(chosenDate)
      dispatchSpeakingCorrections({ type: 'SET_DATE_OF_CORRECTIONS', payload: userFriendlyDate })
    }
  }, [answersToShow])

  return (
    <section className="previousSpeakingCorrectionsSection">
      <Loading
        loading={loading}
      />
      {answersToShow && (
        <>
          <div className="previousCorrectionsInfoDiv">
            <p className="dateOfCorrection">Date of correction: {dateOfCorrections}</p>
          </div>
          <div className="nextButtonsPrevSpeakingCorrections">
            <CarrouselOfItemsButtons
              items={allSpeakingCorrections}
              dispatch={dispatchSpeakingCorrections}
              currentItemIndex={currentItemIndex}
            />
          </div>
          <div className="previousSpeakingCorrectionsContainer">
            <div className="previoiusCorrectionsErrorContainer">
              <SpeakingCorrections
                answersToShow={answersToShow}
              />
            </div>
          </div >
        </>
      )
      }
      {!answersToShow && (
        <div className="studentsPageNoContentDiv">
          <p>You don't have any corrections yet!</p>
          <p>Corrections will appear here after you have done speaking practice in student's page</p>
        </div>
      )
      }

      {needHelp === true && (
        <PageExplanation
          setNeedHelp={setNeedHelp}
          info={infoForPageExplanation}
        />
      )
      }

      <button
        onClick={() => setNeedHelp(true)}
        className="howToButtonCM howToButton"
      >What is this?</button>
    </section >
  )
}

export default PreviousSpeakingCorrections