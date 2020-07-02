import axios from '@/framework/http/axios'
const model = 'treatment'
let findByProductUrl = `api/${model}/findByProduct`
let searchOneByProductUrl = `api/${model}/searchOneByProduct`

// 根据产品id获取疗程信息
export function findByProduct(param, callback) {
  axios.post(findByProductUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据产品id获取疗程信息
export function searchOneByProduct(param, callback) {
  axios.post(searchOneByProductUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

