import axios from '@/framework/http/axios'
const model = 'maintenance'
let findByIdUrl = `api/${model}/findByDevice`
let getFixByIdUrl = `api/${model}/get`
let findUrl = `api/${model}/find`

// 根据设备id获取维修记录
export function findById(param, callback) {
  axios.post(findByIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据维修记录id查看维修记录详情
export function getFixById(param, callback) {
  axios.post(getFixByIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据查询条件获取维修记录
export function find(param, callback) {
  axios.post(findUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
