import axios from '@/framework/http/axios'
const model = 'deviceModel'
let findUrl = `api/${model}/findByName`
let saveUrl = `api/${model}/save`
let updateUrl = `api/${model}/update`
let enableUrl = `api/${model}/enable`
let disableUrl = `api/${model}/disable`

// 获取机型列表
export function find(param, callback) {
  axios.post(findUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
// 更新机型信息
export function update(param, callback) {
  axios.post(updateUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
// 添加机型
export function save(param, callback) {
  axios.post(saveUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
// 启用机型
export function enable(param, callback) {
  axios.post(enableUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
// 禁用机型
export function disable(param, callback) {
  axios.post(disableUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
