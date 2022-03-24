import { useParams, Link } from "react-router-dom"

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)
  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
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
