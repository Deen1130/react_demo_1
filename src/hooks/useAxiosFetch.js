import { useState, useEffect } from 'react'
import axios from 'axios'

// axios 請求
const useAxiosFetch = (dataUrl) => {
  
  // 使用狀態
  const [data, setData] = useState([]) // 數據
  const [fetchError, setFetchError] = useState(null) // 請求錯誤
  const [isLoading, setIsLoading] = useState(false) // 加載中

  // 使用效應監聽
  useEffect(() => {
    let isMounted = true // 使否已監聽
    const source = axios.CancelToken.source() // 取消 Token 令牌來源

    const fetchData = async (url) => {
      setIsLoading(true)
      try {
        // get 獲取
        const response = await axios.get(url, {
          cancelToken: source.token
        })
        if (isMounted) {
          setData(response.data)
          setFetchError(null)
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message)
          setData([])
        }
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    fetchData(dataUrl)

    // 清理
    const cleanUp = () => {
      isMounted = false
      // 來源取消
      source.cancel()
    }

    return cleanUp
  }, [dataUrl])

  return { data, fetchError, isLoading }
}

export default useAxiosFetch