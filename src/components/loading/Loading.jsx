import "./Loading.css"



const Loading = ({ loading }) => {

  return (
    <>
      {loading === true && (
        <div className="loadingDiv">
          <img src="./assets/loading-wizard.png" alt="loading-img" className="loadingImg" />
          <p className="loadingText">Wait while we work our magic!!</p>

          <div className="loading-area">
            <div className="loader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Loading 