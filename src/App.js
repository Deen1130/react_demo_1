import Layout from './Layout'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import EditPost from './EditPost'
import About from './About'
import Missing from './Missing'

import { Route, Routes } from 'react-router-dom'
import './index.css'

import { useEffect } from 'react'
import useAxiosFetch from './hooks/useAxiosFetch'
import { useStoreActions } from 'easy-peasy'

/*
自定義 Hook，可在 javaScript 函數中調用
．命名必須要以 use 開頭，加上 export 分享給其它組件使用
．不能用在迴圈、條件判斷或子函數中調用
*/

/*
Router v6 路由
npm i react-router-dom@6

date-fns 日期格式轉換
npm install date-fns --save

JSON Server 服務器
npm install json-server -g
json-server --port 3500 --watch data/db3.json

Easy Peasy v5 十分簡單狀態管理
npm install easy-peasy
*/

function App () {

  // 使用狀態管理的動作
  const setPosts = useStoreActions((actions) => actions.setPosts)

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

  // 使用監聽效應
  useEffect(() => {
    setPosts(data)
  }, [data, setPosts])

  return (
    <div>
      <div className='title'>
        <div>React Router v6 路由</div>
        <div>axios 請求：get 獲取、post 發送 新增、put 放置 更新、delete 刪除</div>
        <div>Easy Peasy v5 十分簡單狀態管理</div>
      </div>
      <div className='demo-box'>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home
              isLoading={isLoading}
              fetchError={fetchError}
            />} />
            <Route path="post">
              <Route index element={<NewPost />} />
              {/* <Route path="/post/:id" element={<PostPage />} /> */}
              <Route path=":id" element={<PostPage />} />
            </Route>
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
