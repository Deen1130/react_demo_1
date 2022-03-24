import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>網頁未找到</h2>
      <p>
        <Link to='/'>返回首頁</Link>
      </p>
    </main>
  )
}

export default Missing
