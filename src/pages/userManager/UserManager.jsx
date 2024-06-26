import { useEffect, useState } from "react"
import "./UserManager.css"
import { fetchAll } from "../../utils/fetchAll"
import UserSearchBar from './searchUser/UserSearchBar';
import { updateById } from "../../utils/updateById";
import { deleteByIdinDB } from "../../utils/deleteById";
import useSearch from "../../components/searchBar/useSearch";
import { useAuth } from './../../context/AuthContext';
import ClassGroupDropdown from "./classGroupDropdown/ClassGroupDropdown";
import { fetchByUser } from './../../utils/fetchByUser';
import Loading from "../../components/loading/Loading";
import { toast } from "react-toastify";


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
        const result = await fetchAll("user")
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

    const fetchClassGroup = async () => {
      setLoading(true)
      try {
        const result = await fetchByUser("classGroup", userObj._id)
        if (result.error) {
          throw new Error(result.error);
        } else {
          setClassGroups(result)
        }
      } catch (error) {
        console.error('Error fetching class groups:', error);
        toast.error(`Error: We had some difficulty loading data`)

      } finally {
        setLoading(false)
      }
    }
    if (userObj.role === "teacher") {
      fetchClassGroup()
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
      const result = await deleteByIdinDB("user", user._id)

      if (result.error) {
        throw new Error(result.error);
      } else {
        setUpdate(true)
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(`Error: Could not delete the user correctly`)
    } finally {
      setLoading(false)
    }
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
                <p className="userCardTitle">USER DETAILS</p>
                <div className="userCardInfo">
                  <p><strong>User name:</strong> {selectedUser.userName}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>User role:</strong> {selectedUser.role}</p>
                </div>
                <div className="seeUserCardButtons" >
                  <button className="primaryBlueButton" onClick={() => deleteUser(selectedUser)}>Delete user</button>
                  <button className="primaryBlueButton" onClick={() => changeRole(selectedUser)} >Change role to {selectedUser.role === 'student' ? 'Teacher' : 'Student'}</button>
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