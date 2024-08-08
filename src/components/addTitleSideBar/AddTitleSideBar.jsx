
import { useRef } from 'react'
import './AddTitleSideBar.css'
import { toast } from 'react-toastify'

const AddTitleSideBar = ({ dispatch, title, type }) => {
  const titleRef = useRef(null)

  const addTitle = () => {
    console.log(titleRef.current.value)
    if (titleRef.current.value === "") {
      toast.warning(`You need to add a title to continue`)
      return
    } else {
      dispatch({
        type: type,
        payload: titleRef.current.value
      })

    }
  }

  return (
    <div className='addtitleDiv'>
      <p className='sideBarTitleMyClasses'>CREATE A TITLE</p>
      {title !== null && (
        <p className='changeTitle'>Change the title below</p>
      )}
      <input type="text" ref={titleRef} className='inputSideBarMyClasses' />
      <button onClick={() => addTitle()}
        className='sidebarTitleButton'>{title === null ? "ADD TITLE" : "CHANGE TITLE"}</button>
    </div>
  )
}

export default AddTitleSideBar