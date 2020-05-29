import axios from '@/framework/http/axios'
const model = 'device'
let findByEmployeeIdUrl = `api/${model}/findByEmployeeIdAndDeviceNumber`
let countUrl = `api/${model}/count`

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
