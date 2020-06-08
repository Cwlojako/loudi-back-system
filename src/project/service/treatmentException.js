import axios from '@/framework/http/axios'
const model = 'treatmentException'
let searchUrl = `api/${model}/search`

// 获取异常疗程列表
export function search(param, callback) {
  axios.post(searchUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}


