import axios from '@/framework/http/axios'
const model = 'deviceHandover'
let findByDeviceIdUrl = `api/${model}/findByDeviceId`

// 根据设备id获取设备交接记录
export function findByDeviceId(param, callback) {
  axios.post(findByDeviceIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
