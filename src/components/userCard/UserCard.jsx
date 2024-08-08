import './UserCard.css'

const UserCardInfo = ({ selectedUser }) => {
  return (
    <>
      <p className="userCardTitle">USER DETAILS</p>
      <div className="userCardInfo">
        <p><strong>User name:</strong> {selectedUser.userName}</p>
        <p><strong>Email:</strong> {selectedUser.email}</p>
        <p><strong>User role:</strong> {selectedUser.role}</p>
      </div>
    </>
  )
}

export default UserCardInfo   