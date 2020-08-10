import axios from '@/framework/http/axios'
const model = 'treatment'
let findByProductUrl = `api/${model}/findByProduct`
let searchOneByProductUrl = `api/${model}/searchOneByProduct`
let saveTreatmentUrl = `api/${model}/save`
let deleteByIdUrl = `api/${model}/delete`

// 根据产品id获取疗程信息
export function findByProduct(param, callback) {
  axios.post(findByProductUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 根据产品id获取疗程信息
export function searchOneByProduct(param, callback) {
  axios.post(searchOneByProductUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 新增疗程
export function saveTreatment(param, callback) {
  axios.post(saveTreatmentUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 删除疗程
export function deleteById(param, callback) {
  axios.post(deleteByIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}
