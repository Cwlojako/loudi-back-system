import axios from '@/framework/http/axios'
const model = 'customer'
let findByEmployeeIdUrl = `api/${model}/find`
let countUrl = `api/${model}/count`
let getByIdUrl = `api/${model}/get`

// 根据员工id获取员工所属顾客信息
export function findByEmployeeId(param, callback) {
  axios.post(findByEmployeeIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 获取员工所属顾客的总数量
export function count(param, callback) {
  axios.post(countUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据顾客id获取顾客信息
export function getById(param, callback) {
  axios.post(getByIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
