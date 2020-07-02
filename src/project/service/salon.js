import axios from '@/framework/http/axios'
const model = 'salon'
let findByEmployeeIdUrl = `api/${model}/findBySalonAndEmployeeAndDepartment`
let countUrl = `api/${model}/countBySalonAndEmployeeAndDepartment`
let getUrl = `api/${model}/get`
let findUrl = `api/${model}/findBySalonAndEmployeeAndDepartment`
let saveUrl = `api/${model}/save`
let updateUrl = `api/${model}/update`
let countBySalonExampleUrl = `api/${model}/countBySalonExample`
let countMoneyUrl = `api/${model}/countMoney`
let enableUrl = `api/${model}/enable`

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

// 更新店铺
export function update(param, callback) {
  axios.post(updateUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 新增店铺
export function save(param, callback) {
  axios.post(saveUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据合作状态统计店铺数量
export function countBySalonExample(param, callback) {
  axios.post(countBySalonExampleUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据合作状态获取各项金额
export function countMoney(param, callback) {
  axios.post(countMoneyUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 启禁用店铺
export function enable(param, callback) {
  axios.post(enableUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
