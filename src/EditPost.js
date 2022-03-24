import { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { format } from 'date-fns'
import { useStoreState, useStoreActions } from 'easy-peasy'

const EditPost = () => {

  // 使用導航瀏覽歷史紀錄，進行跳頁
  const navigate = useNavigate()

  // 使用參數
  const { id } = useParams()

  // 使用狀態管理的狀態
  const editTitle = useStoreState((state) => state.editTitle)
  const editBody = useStoreState((state) => state.editBody)
  const getPostById = useStoreState((state) => state.getPostById)
  const post = getPostById(id)

  // 使用狀態管理的動作
  const editPost = useStoreActions((actions) => actions.editPost)
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle)
  const setEditBody = useStoreActions((actions) => actions.setEditBody)  

  // 使用效應監聽
  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  }, [post, setEditTitle, setEditBody])

  // 編輯
  const handleEdit = (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
    editPost(updatedPost)
    navigate(`/post/${id}`)
  }

  return (
    <main className="NewPost">
      {editTitle &&
        <>
          <h2>編輯文章</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">文章標題:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">文章內容:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="button" onClick={() => handleEdit(post.id)}>提交</button>
          </form>
        </>
      }
      {!editTitle &&
        <>
          <h2>找不到文章</h2>
          <p>
            <Link to='/'>返回首頁</Link>
          </p>
        </>
      }
    </main>
  )
}

export default EditPost
