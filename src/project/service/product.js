import axios from '@/framework/http/axios'
const model = 'product'
let findAllUrl = `api/${model}/findByProductAndDeviceModel`
let findByIdUrl = `api/${model}/get`
let updateUrl =  `api/${model}/update`
let saveUrl =  `api/${model}/save`
let changeStatusUrl =  `api/${model}/changeStatus`

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

// 更新产品信息
export function update(param, callback) {
  axios.post(updateUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 新增产品
export function save(param, callback) {
  axios.post(saveUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 变换启禁用状态
export function changeStatus(param, callback) {
  axios.post(changeStatusUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

