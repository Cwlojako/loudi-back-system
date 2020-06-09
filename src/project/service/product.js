import axios from '@/framework/http/axios'
const model = 'product'
let findAllUrl = `api/${model}/findByProductAndDeviceModel`
let findByIdUrl = `api/${model}/get`

// 获取所有产品数据
export function findAll(param, callback) {
  axios.post(findAllUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据产品id获取产品数据
export function findById(param, callback) {
  axios.post(findByIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}


