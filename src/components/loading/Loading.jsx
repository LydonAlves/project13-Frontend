import "./Loading.css"

const Loading = ({ loading }) => {

  return (
    <>
      {loading === true && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
    </>
  )
}

export default Loading 