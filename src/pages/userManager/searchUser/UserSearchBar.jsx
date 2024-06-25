import "./UserSearchBar.css"

const UserSearchBar = ({
  searchQuery,
  search,
  filteredItems,
  setSelectedUser
}) => {

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
            <button onClick={() => setSelectedUser(item)} className="userListButton primaryBlueButton"> See User</button>
          </div>
        ))
        }
      </div>
    </ >
  )
}

export default UserSearchBar 