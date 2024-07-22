import "./ActivitySearchBar.css"

const ActivitySearchBar = ({
  searchQuery,
  search,
  filteredItems,
  addActivityToClasses,
  setShowSelectedTask
}) => {

  return (
    <div className="activitySearchBarContainer">
      <h3 className="activitySearchBarTitle">SEARCH</h3>
      <input value={searchQuery} type="search" onChange={e => search(e.target.value)} className="activitySearchInput" />
      <div className="activityContainer">
        {filteredItems && filteredItems.length > 0 ? (
          filteredItems && filteredItems.slice().reverse().slice(0, 5).map((item, index) => (
            <div className="activityDiv" key={item._id}>
              <p className="activityTitleActivitySearchBar" >{item.textObj.title}</p>
              <div className='classActivityButtonDiv'>
                <button className="activitySearchButton"
                  onClick={() => setShowSelectedTask(item)}
                > See Activity</button>
                <button className="activitySearchButton"
                  onClick={() => addActivityToClasses(item, index)}>Choose</button>
              </div>
            </div>
          ))
        ) : (
          <p className="noExercisesCreated">No exercises of this type have been created yet. Go to <strong>Create Exercises</strong> to make one</p>
        )}
      </div>
    </div >
  )
}

export default ActivitySearchBar 