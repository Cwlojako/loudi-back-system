import axios from '@/framework/http/axios'
const model = 'order'
let findByEmployeeIdUrl = `api/${model}/findByOrderAndSalonAndProductAndTeacherAndCustomerAndDepartmentAndPromotion`
let findByCustomerIdUrl = `api/${model}/findByOrderAndSalonAndProductAndTeacherAndCustomerAndDepartmentAndPromotion`
let countUrl = `api/${model}/countByOrderAndSalonAndProductAndTeacherAndCustomerAndDepartmentAndPromotion`
let findByOrderIdUrl = `api/${model}/findByOrderAndSalonAndProductAndTeacherAndCustomerAndDepartmentAndPromotion`
let findUrl = `api/${model}/findByOrderAndSalonAndProductAndTeacherAndCustomerAndDepartmentAndPromotion`
let getByIdUrl = `api/${model}/get`
let updateUrl = `api/${model}/update`
let statisticalMonthlyDataUrl = `api/${model}/statisticalMonthlyData`

// 查询所有订单信息
export function find(param, callback) {
  axios.post(findUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据员工id获取员工所属订单信息
export function findByEmployeeId(param, callback) {
  axios.post(findByEmployeeIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 获取员工所属订单的总数量
export function count(param, callback) {
  axios.post(countUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据订单id获取订单详细信息
export function getById(param, callback) {
  axios.post(getByIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据订单id获取订单详细信息
export function findByOrderId(param, callback) {
  axios.post(findByOrderIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}


// 根据顾客id获取订单信息
export function findByCustomerId(param, callback) {
  axios.post(findByCustomerIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 更新订单信息
export function update(param, callback) {
  axios.post(updateUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 统计当月订单数据
export function statisticalMonthlyData(param, callback) {
  axios.post(statisticalMonthlyDataUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
