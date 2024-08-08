export const removeActivity = (payloadKey, dispatch) => {
  dispatch({
    type: "UPDATE_ACTIVITIES_CHOSEN",
    payload: {
      [payloadKey]: ""
    }
  })

} 