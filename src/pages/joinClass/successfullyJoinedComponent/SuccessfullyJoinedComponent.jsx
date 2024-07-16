
import { useNavigate } from 'react-router-dom'
import './SuccessfullyJoinedComponent.css'

const SuccessfullyJoinedComponent = ({ setSuccessfullyJoined }) => {
  const navigate = useNavigate()

  const sendToStudentPage = () => {
    setSuccessfullyJoined()
    navigate('/students-page')
  }

  return (
    <div className="joinedDiv">
      <h1 className="joinedTitle">You have successfully been assigned a class group </h1>
      <button className="joinedButton" onClick={() => sendToStudentPage()}>Begin practicing</button>
    </div>
  )
}

export default SuccessfullyJoinedComponent