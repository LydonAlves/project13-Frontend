import "./Loading.css"

const Loading = ({ loading }) => {

  return (
    <>
      {loading === true && (
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
      )}
    </>
  )
}

export default Loading 