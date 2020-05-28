import axios from '@/framework/http/axios'
const model = 'salon'
let findByEmployeeIdUrl = `api/${model}/findBySalonAndEmployeeAndDepartment`
let countUrl = `api/${model}/countBySalonAndEmployeeAndDepartment`

// 根据员工id获取员工所属店铺信息
export function findByEmployeeId(param, callback) {
  axios.post(findByEmployeeIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 获取员工所属店铺的总数量
export function count(param, callback) {
  axios.post(countUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
