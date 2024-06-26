import { useMemo, useState } from "react"

const useSearch = (array) => {
  const [searchQuery, setSearchQuery] = useState("")

  const search = (value) => {
    setSearchQuery(value)
  }

  const filteredItems = useMemo(() => {
    if (array.length === 0) {
      return
    }

    if (array[0].textObj) {
      return array.filter(item => item.textObj.title.toLowerCase().includes(searchQuery.toLowerCase()))
    } else if (array[0].title) {
      return array.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    } else if (array[0].userName) {
      return array.filter(item => item.userName.toLowerCase().includes(searchQuery.toLowerCase()))
    }

  }, [array, searchQuery]);


  return {
    searchQuery, search, filteredItems
  }
}

export default useSearch