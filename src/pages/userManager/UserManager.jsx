import { useEffect, useReducer, useState } from "react"
import "./UserManager.css"
import { useAuth } from './../../context/AuthContext';
import Loading from "../../components/loading/Loading";
import { INITIAL_USER_MANAGER, userManagerReducer } from "../../reducers/userManagerReducer";
import UserSearchBar from './../../components/searchUser/UserSearchBar';
import ClassGroupDropdown from './../../components/classGroupDropdown/ClassGroupDropdown';
import { fetchClassGroup } from './../../functions/userManagerFunctions/fetchClassGroup';
import { deleteUserFunction } from './../../functions/userManagerFunctions/deleteUserFunction';
import UserCardInfo from "../../components/userCard/UserCard";
import { changeRole } from './../../functions/userManagerFunctions/changeRole';
import { fetchUsers } from './../../functions/userManagerFunctions/fetchUsers';

const UserManager = () => {
  const { userObj } = useAuth()
  const [stateUserManager, dispatchUserManager] = useReducer(userManagerReducer, INITIAL_USER_MANAGER)
  const { users, students, selectedUser, userRoleSelected, selectedGroup } = stateUserManager
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedUser === null) {
      setLoading(true)
      fetchUsers(dispatchUserManager)
      setLoading(false)
    }
  }, [selectedUser])

  useEffect(() => {
    const teacherList = users.filter(user => user.role === "teacher");
    const studentList = users.filter(user => user.role === "student")
    dispatchUserManager({ type: 'SET_TEACHERS', payload: teacherList })
    dispatchUserManager({ type: 'SET_STUDENTS', payload: studentList })
  }, [users]);

  useEffect(() => {
    if (userObj && userObj.role === "teacher") {
      setLoading(true)
      fetchClassGroup(userObj, dispatchUserManager)
      setLoading(false)
    }
  }, [userObj])

  useEffect(() => {
    if (selectedGroup) {
      const studentsByclass = students.filter(student => student.classGroup === selectedGroup._id)
      dispatchUserManager({ type: 'SET_STUDENTS_IN_GROUP', payload: studentsByclass })
    }
  }, [selectedGroup])


  const handleDeleteUser = (user) => {
    setLoading(true)
    deleteUserFunction(dispatchUserManager, user)
    setLoading(false)
  }

  const handleChangeRole = (user) => {
    changeRole(user, selectedUser, dispatchUserManager, setLoading)
  }

  return (
    <section className="userManagerSection">
      <Loading
        loading={loading}
      />
      <h1 className="userManagerTitle">Manage Users</h1>
      <div className="userManagerContainer">
        <div className="searchContainerUserManager">
          <div className="searchButtonDivUM">
            {userObj && userObj.role === "admin" ? (
              <>
                <button
                  className={`userSearchButton ${userRoleSelected === "teacher" ? "largeBlueButton" : "largeBlueButtonUnselected"}`}
                  onClick={() => dispatchUserManager({ type: 'SET_USER_ROLE_SELECTED', payload: "teacher" })}
                >Teachers</button>
                <button
                  className={`userSearchButton ${userRoleSelected === "student" ? "largeBlueButton" : "largeBlueButtonUnselected"}`}
                  onClick={() => dispatchUserManager({ type: 'SET_USER_ROLE_SELECTED', payload: "student" })}
                >Students</button>
              </>
            ) : (
              <ClassGroupDropdown
                options={stateUserManager.classGroups}
                dispatch={dispatchUserManager}
              />
            )}
          </div>
          <UserSearchBar
            state={stateUserManager}
            dispatch={dispatchUserManager}
            userObj={userObj}
          />
        </div>
        <div className="seeUserCardContainer">
          <div className="seeUserCardDiv">
            {selectedUser ? (
              <div className="seeUserCard">
                <UserCardInfo
                  selectedUser={selectedUser}
                />
                <div className="seeUserCardButtons" >
                  <button className="primaryBlueButton" onClick={() => handleDeleteUser(selectedUser)}>Delete user</button>

                  {userObj.role === "admin" && (
                    <button
                      className="primaryBlueButton"
                      onClick={() => handleChangeRole(selectedUser)}
                    >Change role to {selectedUser.role === 'student' ? 'Teacher' : 'Student'}</button>
                  )}

                </div>
                <button
                  className="exitButtonUM primaryGreenButton"
                  onClick={() => dispatchUserManager({ type: 'SET_SELECTED_USER', payload: "" })}>Close</button>
              </div>
            ) : (
              <p className="noUserSelectedText">When you click on "see user" their information will appear here</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserManager 