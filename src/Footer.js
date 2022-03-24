import { useStoreState } from 'easy-peasy'

const Footer = () => {
  
  // 使用狀態管理的狀態
  const postCount = useStoreState((state) => state.postCount)

  return (
    <footer className='Footer'>
      <div>共 {postCount} 篇文章</div>
    </footer>
  )
}

export default Footer
