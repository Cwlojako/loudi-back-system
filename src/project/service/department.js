import axios from '@/framework/http/axios'
const model = 'department'
let saveUrl = `api/${model}/save`
let deleteUrl = `api/${model}/delete`
let getUrl = `api/${model}/get`
let findFatherUrl = `api/${model}/findFather`
let findByParentIdUrl = `api/${model}/findByParentId`
let findNextUrl = `api/${model}/findNext`

// 新增部门
export function save(param, callback) {
	axios.post(saveUrl, param).then(data => {
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

// 获取根部门(无参数)
export function findFather(callback) {
	axios.post(findFatherUrl).then(data => {
	if (data !== undefined && data !== '' && data !== null) {
		callback(data)
	}
	})
}

// 根据根部门id获取子部门
export function findByParentId(param, callback) {
	axios.post(findByParentIdUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
		callback(data)
		}
	})
}

// 根据父级部门id值找下一层级的所有部门
export function findNext(param, callback) {
	axios.post(findNextUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
		callback(data)
		}
	})
}