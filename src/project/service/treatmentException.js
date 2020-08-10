import axios from '@/framework/http/axios'
const model = 'treatmentException'
let searchUrl = `api/${model}/search`
let countUrl = `api/${model}/count`
let getUrl = `api/${model}/get`
let findUrl = `api/${model}/findByTreatmentAndCustomerAndDeviceAndEmployee`

// 获取异常疗程列表
export function search(param, callback) {
  axios.post(searchUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

export function find(param, callback) {
  axios.post(findUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

//获取列表的数量
export function count(param, callback) {
  axios.post(countUrl, param).then(data => {
    if(data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

//获取异常的详情
export function get(param, callback) {
  axios.post(getUrl, param).then(data => {
    if(data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

