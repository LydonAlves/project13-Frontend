import './AddTitleSideBar.css'

const AddTitleSideBar = ({ title, titleRef, addTitle }) => {
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