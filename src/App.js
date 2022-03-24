import Layout from './Layout'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import './index.css'

/*
Router v6 路由
npm i react-router-dom@6

date-fns 日期格式轉換
npm install date-fns --save
*/

function App () {
  // 文章數據
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "我的第一篇文章",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "我的第二篇文章",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "我的第三篇文章",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "我的第四篇文章",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ])
  const [search, setSearch] = useState('') // 搜尋
  const [searchResults, setSearchResults] = useState([]) // 搜尋結果
  const [postTitle, setPostTitle] = useState('') // 新增文章標題
  const [postBody, setPostBody] = useState('') // 新增文章內容
  const navigate = useNavigate() // 使用導航瀏覽歷史紀錄，進行跳頁
  // 使用效應監聽
  useEffect(() => {
    // 數據篩選 標題與內容
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    // 設置搜尋結果狀態 數據反向排序
    setSearchResults(filteredResults.reverse())
  }, [posts, search])
  // 新增
  const handleSubmit = (e) => {
    e.preventDefault()
    // const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const id = new Date().getTime()
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    const allPosts = [...posts, newPost]
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
  }
  // 刪除
  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id)
    setPosts(postsList)
    navigate('/')
  }
  return (
    <div>
      <div className='title'>
        <div>React Router v6 路由</div>
        <div>Route index 首頁</div>
        <div>Outlet 插座，意思是在於頁首與頁尾之間的內容區塊</div>
      </div>
      <div className='demo-box'>
        <Routes>
          <Route path="/" element={<Layout
            search={search}
            setSearch={setSearch}
          />}>
            <Route index element={<Home posts={searchResults} />} />
            <Route path="post">
              <Route index element={<NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />} />
              {/* <Route path="/post/:id" element={<PostPage
                posts={posts}
                handleDelete={handleDelete}
              />} /> */}
              <Route path=":id" element={<PostPage
                posts={posts}
                handleDelete={handleDelete}
              />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </div>
    </div>    
  )
}

export default App
