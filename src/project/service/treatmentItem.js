// 订单下对应的疗程信息
import axios from '@/framework/http/axios'
const model = 'treatmentItem'
let findByProductUrl = `api/${model}/findByProduct`

// 根据产品id获取疗程信息
export function findByProduct(param, callback) {
  axios.post(findByProductUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

