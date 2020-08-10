import axios from '@/framework/http/axios'
const model = 'salonHandover'
let findBySalonIdUrl = `api/${model}/findBySalon`
let getUrl = `api/${model}/get`

// 根据店铺id获取店铺交接记录
export function findHandoverBySalonId(param, callback) {
  axios.post(findBySalonIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

export function get(param, callback) {
  axios.post(getUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}