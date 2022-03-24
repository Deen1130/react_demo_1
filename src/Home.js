import Feed from './Feed'

const Home = ({ posts }) => {
  return (
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{ marginTop: "2rem" }}>
          沒有可顯示的文章
        </p>
      )}
    </main>
  )
}

export default Home
