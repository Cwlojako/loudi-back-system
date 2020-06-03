import axios from '@/framework/http/axios'
const model = 'salon'
let findByEmployeeIdUrl = `api/${model}/findBySalonAndEmployeeAndDepartment`
let countUrl = `api/${model}/countBySalonAndEmployeeAndDepartment`
let getUrl = `api/${model}/get`
let findUrl = `api/${model}/findBySalonAndEmployeeAndDepartment`

// 根据员工id获取员工所属店铺信息
export function findByEmployeeId(param, callback) {
  axios.post(findByEmployeeIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 获取符合条件店铺的总数量
export function count(param, callback) {
  axios.post(countUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 获取店铺id获取店铺信息
export function getById(param, callback) {
  axios.post(getUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 获取全部店铺列表
export function find(param, callback) {
  axios.post(findUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
