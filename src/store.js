import { createStore, action, thunk, computed } from "easy-peasy"
import api from './api/posts'

/*
．createStore({}) 創建狀態管理
．action((state, payload) => {}) 動作 (當前狀態, 新狀態)
．computed((state) => {}) 計算函數 (當前狀態)
．thunk(async (actions, payload, helpers) => {}) 重擊；使用 async 異步支持 (異步 (動作, 新狀態, 小幫手))
*/

// 創建狀態管理
export default createStore({
  posts: [], // 文章數據
  setPosts: action((state, payload) => {
    state.posts = payload
  }),
  postTitle: '', // 新增文章標題
  setPostTitle: action((state, payload) => {
    state.postTitle = payload
  }),
  postBody: '', // 新增文章內容
  setPostBody: action((state, payload) => {
    state.postBody = payload
  }),
  editTitle: '', // 編輯文章標題
  setEditTitle: action((state, payload) => {
    state.editTitle = payload
  }),
  editBody: '', // 編輯文章內容
  setEditBody: action((state, payload) => {
    state.editBody = payload
  }),
  search: '', // 搜尋字串
  setSearch: action((state, payload) => {
    state.search = payload
  }),
  searchResults: [], // 搜尋結果
  setSearchResults: action((state, payload) => {
    state.searchResults = payload
  }),
  // 文章數 計算函數
  postCount: computed((state) => state.posts.length),
  // 以 id 尋找文章 計算函數
  getPostById: computed((state) => {
    // 尋找，返回對象寫法
    return (id) => state.posts.find(post => (post.id).toString() === id)
  }),
  // 新增文章
  addPost: thunk(async (actions, newPost, helpers) => {
    const { posts } = helpers.getState()
    try {
      // axios post 發送 新增
      const response = await api.post('/posts', newPost)
      actions.setPosts([...posts, response.data])
      actions.setPostTitle('')
      actions.setPostBody('')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }),
  // 刪除文章
  deletePost: thunk(async (actions, id, helpers) => {
    const { posts } = helpers.getState()
    try {
      // axios delete 刪除
      await api.delete(`/posts/${id}`)
      actions.setPosts(posts.filter(post => post.id !== id))
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }),
  // 編輯文章
  editPost: thunk(async (actions, updatedPost, helpers) => {
    const { posts } = helpers.getState() // 助手 獲取狀態
    const { id } = updatedPost
    try {
      // axios put 放置 更新
      const response = await api.put(`/posts/${id}`, updatedPost)
      actions.setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
      actions.setEditTitle('')
      actions.setEditBody('')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  })
})