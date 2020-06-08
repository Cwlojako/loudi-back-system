import axios from '@/framework/http/axios'
const model = 'deviceHandover'
let findByDeviceIdUrl = `api/${model}/findByDeviceId`
let findByDeviceHandoverUrl = `api/${model}/findByDeviceHandover`

// 根据设备id获取设备交接记录
export function findByDeviceId(param, callback) {
  axios.post(findByDeviceIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据交接记录id获取交接记录详情
export function findByDeviceHandover(param, callback) {
  axios.post(findByDeviceHandoverUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
