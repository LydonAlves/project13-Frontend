import "./AddYoutubeLink.css"

const AddYoutubeLink = ({ setVideoLink }) => {

  return (
    <div className="addYoutubeLinkDiv">
      <p className="addYoutubeLinkTitle">Add a YouTube link below</p>
      <input
        onChange={(e) => setVideoLink(e.target.value)}
        className="addYoutubeLinkInput"
      />
    </div>
  )
}

export default AddYoutubeLink