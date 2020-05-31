import axios from '@/framework/http/axios'
const model = 'contract'
let findByEmployeeIdUrl = `api/${model}/search`
let countUrl = `api/${model}/count`
let saveUrl = `api/${model}/save`
let updateUrl = `api/${model}/update`

// 根据员工id获取员工合同信息
export function findByEmployeeId(param, callback) {
  axios.post(findByEmployeeIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据员工id获取合同信息总条目
export function count(param, callback) {
  axios.post(countUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 新增合同
export function save(param, callback) {
  axios.post(saveUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

//更新编辑合同
export function update(param, callback) {
  axios.post(updateUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
