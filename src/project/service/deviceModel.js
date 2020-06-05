import axios from '@/framework/http/axios'
const model = 'deviceModel'
let findUrl = `api/${model}/findByName`

// 获取机型列表
export function find(param, callback) {
  axios.post(findUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

