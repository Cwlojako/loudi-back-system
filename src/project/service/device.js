import axios from '@/framework/http/axios'
const model = 'device'
let findUrl = `api/${model}/find`
let findByEmployeeIdUrl = `api/${model}/findByEmployeeIdAndDeviceNumber`
let countUrl = `api/${model}/count`
let getByIdUrl = `api/${model}/get`
let updateUrl = `api/${model}/update`
let enableUrl = `api/${model}/enable`
let disableUrl = `api/${model}/disable`

// 获取全部设备列表
export function find(param, callback) {
  axios.post(findUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据员工id获取员工所属设备信息
export function findByEmployeeId(param, callback) {
  axios.post(findByEmployeeIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 获取员工所属设备的总数量
export function count(param, callback) {
  axios.post(countUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据设备id获取设备信息
export function getById(param, callback) {
  axios.post(getByIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 更新设备信息
export function update(param, callback) {
  axios.post(updateUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 启用设备
export function enable(param, callback) {
  axios.post(enableUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 禁用设备
export function disable(param, callback) {
  axios.post(disableUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
