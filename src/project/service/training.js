import axios from '@/framework/http/axios'
const model = 'training'
let findBySalonIdUrl = `api/${model}/findBySalon`
let countUrl = `api/${model}/countByTrainingAndEmployeeAndSalonAndDepartment`
let getUrl = `api/${model}/get`

// 根据店铺id获取培训记录
export function findBySalonId(param, callback) {
  axios.post(findBySalonIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

export function count(param, callback) {
  axios.post(countUrl, param).then(data => {
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

