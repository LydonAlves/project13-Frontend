import './NoClassGroupPopup.css'

const NoClassGroupPopup = ({ setNoClassPopup, submitId }) => {

  const useGenericGroup = () => {
    submitId('665c7baf869680ba3df6c46f')
    setNoClassPopup(false)
  }


  return (
    <div className='noClassPopupDiv'>
      <h1 className='noClassPopupH1'>You are not currently part of any class group</h1>
      <p className='noClassPopuptext'>In order to be able to use this app you can either add a class group code provided to you by your teacher or you can use a generic class group to begin</p>
      <div className='noClassPopupButtonDiv'>
        <button className='noClassPopupButton' onClick={() => setNoClassPopup(false)}>Add a class group code</button>
        <button className='noClassPopupButton' onClick={() => useGenericGroup()}>Use the generic group</button>
      </div>
    </div>
  )
}

export default NoClassGroupPopup