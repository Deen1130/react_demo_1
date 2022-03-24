import { useParams, Link, useNavigate } from "react-router-dom"
import { useStoreState, useStoreActions } from 'easy-peasy'

const PostPage = () => {

  // 使用導航瀏覽歷史紀錄，進行跳頁
  const navigate = useNavigate()

  // 使用參數
  const { id } = useParams()

  // 使用狀態管理的狀態
  const getPostById = useStoreState((state) => state.getPostById)
  const post = getPostById(id)

  // 使用狀態管理的動作
  const deletePost = useStoreActions((actions) => actions.deletePost)  

  // 刪除
  const handleDelete = (id) => {
    deletePost(id)
    navigate('/')
  }

  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className="editButton">編輯文章</button></Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              刪除文章
            </button>
          </>
        }
        {!post &&
          <>
            <h2>找不到文章</h2>
            <p>
              <Link to='/'>返回首頁</Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage
