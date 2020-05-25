import axios from '@/framework/http/axios'
const model = 'department'
let saveUrl = `api/${model}/save`
let searchUrl = `api/${model}/search`
let deleteUrl = `api/${model}/delete`
let getUrl = `api/${model}/get`

// 新增部门
export function save(param, callback) {
	axios.post(saveUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}

// 获取部门列表
export function searchDepartment(param, callback) {
	axios.post(searchUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}

// 根据部门id删除部门
export function delDepartment(param, callback) {
	axios.post(deleteUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}

// 根据部门id获取部门信息
export function get(param, callback) {
	axios.post(getUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}


