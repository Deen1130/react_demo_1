const NewPost = ({
  handleSubmit, postTitle, setPostTitle, postBody, setPostBody
}) => {
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
