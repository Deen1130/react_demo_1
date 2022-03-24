import axios from 'axios'

// axios 請求創建
export default axios.create({
  baseURL: 'http://localhost:3500' // 基本網址
})