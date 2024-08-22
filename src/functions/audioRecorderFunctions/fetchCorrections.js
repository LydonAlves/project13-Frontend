import { toast } from "react-toastify";
import { fetchFunction } from "../../utils/fetchAll";



export const fetchCorrections = async (dispatch, currentDate, userObj) => {


  const extractDate = (isoString) => isoString.substring(0, 10)
  const currentDateWithoutTime = extractDate(currentDate)

  try {
    const result = await fetchFunction("speakingCorrection/by-userId", userObj._id);
    console.log("result", result);

    if (result.error) {
      throw new Error(result.error)
    } else {
      // const todaysCorrections = result.filter(item => extractDate(item.date) === currentDateWithoutTime)

      dispatch({ type: 'SET_ALL_SPEAKING_CORRECTIONS', payload: result })
    }
  } catch (error) {
    console.error('Error fetching speaking corrections:', error);
    toast.error(`Error: We had some difficulty loading data`)

  }
}


//! I have to see if I need to set up a way to distinguish between todaysCorrections and corrections in general
//? I need to compare the practice and jus the view of the corrections