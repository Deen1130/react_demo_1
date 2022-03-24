import useWindowSize from './hooks/useWindowSize'

const Header = ({ title }) => {

  // 使用自定義 Hook
  const { width } = useWindowSize()

  return (
    <header className="Header">
      <h1>{title}</h1>
      {width < 768 ? <span>行動</span>
        : width < 992 ? <span>平板</span>
          : <span>桌機</span>}
    </header>
  )
}

export default Header