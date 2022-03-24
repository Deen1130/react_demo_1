import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'

const Nav = () => {

  // 使用狀態管理的狀態
  const posts = useStoreState((state) => state.posts)
  const search = useStoreState((state) => state.search)

  // 使用狀態管理的動作
  const setSearch = useStoreActions((actions) => actions.setSearch)
  const setSearchResults = useStoreActions((actions) => actions.setSearchResults)

  // 使用效應監聽
  useEffect(() => {
    // 數據篩選 標題與內容
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    // 設置搜尋結果狀態 數據反向排序
    setSearchResults(filteredResults.reverse())
  }, [posts, search, setSearchResults])

  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input
          id="search"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="post">Post</Link></li>
        <li><Link to="about">About</Link></li>
      </ul>
    </nav>
  )
}

export default Nav
