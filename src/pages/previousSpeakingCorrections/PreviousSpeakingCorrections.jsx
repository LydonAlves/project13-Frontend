import { useEffect, useState } from "react"
import "./PreviousSpeakingCorrections.css"
import { formatDate } from "../../context/DateContext"
import CarrouselOfItemsButtons from "../../components/carrouselOfItemsButtons/CarrouselOfItemsButtons"
import { fetchByUser } from "../../utils/fetchByUser"
import { useAuth } from './../../context/AuthContext';
import SpeakingCorrections from "../../components/speakingCorrections/SpeakingCorrections"
import Loading from "../../components/loading/Loading"
import { toast } from "react-toastify"
import PageExplanation from "../../components/pageExplanation/PageExplanation"
import { infoForPageExplanation } from "../../components/pageExplanation/infoForexplanations/infoForExplanations"

const PreviousSpeakingCorrections = () => {
  const [allSpeakingCorrections, setAllSpeakingCorrections] = useState([])
  const [lastTenResults, setLastTenResults] = useState([])
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [dateOfCorrections, setDateOfCorrections] = useState("")
  const [needHelp, setNeedHelp] = useState(false)
  const [loading, setLoading] = useState(false)
  const answersToShow = lastTenResults[currentItemIndex];
  const { userObj } = useAuth()

  //! Error settings done 
  useEffect(() => {
    const fetchCorrections = async () => {
      setLoading(true)
      try {
        const result = await await fetchByUser("speakingCorrection", userObj._id);
        if (result.error) {
          throw new Error(result.error);
        } else {
          setAllSpeakingCorrections(result)
        }
      } catch (error) {
        console.error('Error fetching speaking corrections:', error);
        toast.error(`Error: We had some difficulty loading data`)

      } finally {
        setLoading(false)
      }
    }

    if (userObj) {
      fetchCorrections()
    }
  }, [userObj])

  useEffect(() => {
    if (allSpeakingCorrections.length > 0) {
      const lastTenItems = allSpeakingCorrections.slice(-10);
      setLastTenResults(lastTenItems)
    }
  }, [allSpeakingCorrections])

  useEffect(() => {
    if (answersToShow) {
      let chosenDate = formatDate(answersToShow.date)
      setDateOfCorrections(chosenDate)
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
              setCurrentItemIndex={setCurrentItemIndex}
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