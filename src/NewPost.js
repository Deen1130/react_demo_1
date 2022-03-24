import { useNavigate } from "react-router-dom"
import { format } from 'date-fns'
import { useStoreState, useStoreActions } from 'easy-peasy'

const NewPost = () => {

  // 使用導航瀏覽歷史紀錄，進行跳頁
  const navigate = useNavigate()

  // 使用狀態管理的狀態
  // const posts = useStoreState((state) => state.posts)
  const postTitle = useStoreState((state) => state.postTitle)
  const postBody = useStoreState((state) => state.postBody)

  // 使用狀態管理的動作
  const addPost = useStoreActions((actions) => actions.addPost)
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle)
  const setPostBody = useStoreActions((actions) => actions.setPostBody)  

  // 新增
  const handleSubmit = (e) => {
    e.preventDefault()
    // const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const id = new Date().getTime()
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    addPost(newPost)
    navigate('/') // 進行跳頁
  }

  return (
    <main className="NewPost">
      <h2>新增文章</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">文章標題:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">文章內容:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">提交</button>
      </form>
    </main>
  )
}

export default NewPost
