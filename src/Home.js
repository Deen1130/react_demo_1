import Feed from './Feed'
import { useStoreState } from 'easy-peasy'

const Home = ({ isLoading, fetchError }) => {

  // 使用狀態管理的狀態
  const searchResults = useStoreState((state) => state.searchResults)

  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">加載文章中...</p>}
      {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
      {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className="statusMsg">沒有可顯示的文章</p>)}
    </main>
  )
}

export default Home