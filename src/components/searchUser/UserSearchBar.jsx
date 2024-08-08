import useSearch from "../../hooks/useSearch"
import "./UserSearchBar.css"

const UserSearchBar = ({
  state,
  dispatch,
  userObj
}) => {
  const { userRoleSelected, teachers, students, studentsInGroup } = state

  let userType = userRoleSelected === "teacher" ? teachers : students
  let arrayForSearch = userObj && userObj.role === "teacher" ? studentsInGroup : userType
  const { searchQuery, search, filteredItems } = useSearch(arrayForSearch)

  const handleSeeUser = (item) => {
    dispatch({ type: 'SET_SELECTED_USER', payload: item })
  }

  return (
    <>
      <h3 className="userSearchBarTitle">Search</h3>
      <input
        value={searchQuery}
        type="search"
        onChange={e => search(e.target.value)}
        className="userSearchInput" />
      <div className="userSearchContainer">
        {filteredItems && filteredItems.slice().reverse().map((item) => (
          <div className="userSearchBarDiv" key={item._id}>
            <p className="userListUser">{item.userName}</p>
            <button onClick={() => handleSeeUser(item)} className="userListButton primaryBlueButton"> See User</button>
          </div>
        ))
        }
      </div>
    </ >
  )
}

export default UserSearchBar 