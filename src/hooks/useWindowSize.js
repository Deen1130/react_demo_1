import { useState, useEffect } from "react"

// 視窗大小
const useWindowSize = () => {

  // 使用狀態
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  })

  // 使用效應監聽
  useEffect(() => {

    // 調整大小
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth, // 獲取視窗內寬度
        height: window.innerHeight // 獲取視窗內高度
      })
    }

    handleResize()

    // 視窗 添加事件監聽 調整大小
    window.addEventListener("resize", handleResize)

    // 組件卸載前    
    return () => window.removeEventListener("resize", handleResize) // 移除事件監聽
  }, [])

  return windowSize
}

export default useWindowSize
