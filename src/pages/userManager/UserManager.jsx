import { useEffect, useState } from "react"
import "./UserManager.css"
//import { fetchAll } from "../../utils/fetchAll"
import UserSearchBar from './searchUser/UserSearchBar';
import { updateById } from "../../utils/updateById";
import useSearch from "../../components/searchBar/useSearch";
import { useAuth } from './../../context/AuthContext';
import ClassGroupDropdown from "./classGroupDropdown/ClassGroupDropdown";
import Loading from "../../components/loading/Loading";
import { toast } from "react-toastify";
import { fetchClassGroup } from "./userManagerFunctions/fetchClassGroup";
import { deleteUserFunction } from "./userManagerFunctions/deleteUserFunction";
import UserCardInfo from "./userCard/UserCard";
import { fetchFunction } from "../../utils/fetchAll";

const UserManager = () => {
  const [update, setUpdate] = useState(true)
  const [users, setUsers] = useState([])
  const [userRoleSelected, setUserRoleSelected] = useState("teacher")
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])
  const [selectedUser, setSelectedUser] = useState()
  const [classGroups, setClassGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState()
  const [studentsInGroup, setStudentsInGroup] = useState([])
  const [loading, setLoading] = useState(false)
  const { userObj } = useAuth()

  let userType = userRoleSelected === "teacher" ? teachers : students
  let arrayForSearch = userObj && userObj.role === "teacher" ? studentsInGroup : userType
  const { searchQuery, search, filteredItems } = useSearch(arrayForSearch)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        // const result = await fetchAll("user")
        const result = await fetchFunction("user")
        if (result.error) {
          throw new Error(result.error);
        } else {
          setUsers(result)
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error(`Error: We had some difficulty loading data`)
      } finally {
        setLoading(false)
      }
    }

    if (update === true) {
      fetchUsers()
      setUpdate(false)
    }
  }, [update])


  useEffect(() => {
    const teacherList = users.filter(user => user.role === "teacher");
    const studentList = users.filter(user => user.role === "student")

    setTeachers(teacherList);
    setStudents(studentList)
  }, [users]);


  useEffect(() => {
    if (!userObj) {
      return
    }

    if (userObj.role === "teacher") {
      fetchClassGroup(userObj, setLoading, setClassGroups)
    }
  }, [userObj])

  useEffect(() => {
    if (!selectedGroup) {
      return
    }
    const studentsByclass = students.filter(student => student.classGroup === selectedGroup._id)
    setStudentsInGroup(studentsByclass)
  }, [selectedGroup])

  const deleteUser = async (user) => {
    setLoading(true)
    try {
      await deleteUserFunction(user, setUpdate, setSelectedUser)
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    setLoading(false)
  }

  const changeRole = async (user) => {
    const newRole = selectedUser.role === 'student' ? 'teacher' : 'student';
    const updatedData = { role: newRole }
    setLoading(true)
    try {
      const result = await updateById("user", user._id, updatedData)

      if (result.error) {
        throw new Error(result.error);
      } else {
        setUpdate(true)
        setSelectedUser(null)
      }
    } catch (error) {
      console.error('Error updating the user:', error);
      toast.error(`Error: Could not the user`)
    } finally {
      setLoading(false)
    }
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
                  onClick={() => setUserRoleSelected("teacher")}
                >Teachers</button>

                <button
                  className={`userSearchButton ${userRoleSelected === "student" ? "largeBlueButton" : "largeBlueButtonUnselected"}`}
                  onClick={() => setUserRoleSelected("student")}
                >Students</button>
              </>
            ) : (
              <ClassGroupDropdown
                options={classGroups}
                onSelect={setSelectedGroup}
              />
            )}
          </div>
          <UserSearchBar
            searchQuery={searchQuery}
            search={search}
            filteredItems={filteredItems}
            setSelectedUser={setSelectedUser}
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
                  <button className="primaryBlueButton" onClick={() => deleteUser(selectedUser)}>Delete user</button>

                  {userObj.role === "admin" && (
                    <button
                      className="primaryBlueButton"
                      onClick={() => changeRole(selectedUser)}
                    >Change role to {selectedUser.role === 'student' ? 'Teacher' : 'Student'}</button>
                  )}

                </div>
                <button
                  className="exitButtonUM primaryGreenButton"
                  onClick={() => setSelectedUser("")}>Close</button>
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