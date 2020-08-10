import axios from '@/framework/http/axios'
const model = 'promotion';
let findAllUrl = `api/${model}/findAll`;
let enableUrl = `api/${model}/enable`;
let disableUrl = `api/${model}/disable`;
let getByIdUrl = `api/${model}/get`;
let removeDepartmentUrl = `api/${model}/removeDepartment`;
let saveUrl = `api/${model}/save`;

export function findAll(param, callback) {
  axios.post(findAllUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function enable(param, callback) {
    axios.post(enableUrl, param).then(data => {
      if (data !== undefined && data !== '' && data !== null) {
        // callback when data is exist
        callback(data)
      }
    })
  }


export function disable(param, callback) {
    axios.post(disableUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
        // callback when data is exist
        callback(data)
        }
    })
}

export function getById(param, callback) {
    axios.post(getByIdUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
        // callback when data is exist
        callback(data)
        }
    })
}

export function removeDepartment(param, callback) {
    axios.post(removeDepartmentUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
        // callback when data is exist
        callback(data)
        }
    })
}

export function save(param, callback) {
  axios.post(saveUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

