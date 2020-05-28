import axios from '@/framework/http/axios'
const model = 'employee'
let getUrl = `api/${model}/get`
let findUrl = `api/${model}/find`
let enableUrl = `api/${model}/enable`
let disableUrl = `api/${model}/disable`
let countUrl = `api/${model}/count`
let saveUrl = `api/${model}/save`
let updateUrl = `api/${model}/update`
let batchEnableUrl = `api/${model}/batchEnable`
let batchDisableUrl = `api/${model}/batchDisable`
let leaveUrl = `api/${model}/leave`
let restoreUrl = `api/${model}/restore`
let getInfoUrl = `api/${model}/getInfo`

// 根据id获取员工信息
export function get(param, callback) {
	axios.post(getUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}
// 查询员工信息表
export function find(param, callback) {
	axios.post(findUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}
// 根据员工id启用员工
export function enable(param, callback) {
	axios.post(enableUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}
// 根据员工id禁用员工
export function disable(param, callback) {
	axios.post(disableUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}
// 统计员工信息条目数量
export function count(param, callback) {
	axios.post(countUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}
// 更新员工信息
export function update(param, callback) {
	axios.post(updateUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}
// 新增员工
export function save(param, callback) {
	axios.post(saveUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}
// 批量启用
export function batchEnable(param, callback) {
	axios.post(batchEnableUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}
// 批量禁用
export function batchDisable(param, callback) {
	axios.post(batchDisableUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}
// 根据id删除员工/离职员工
export function leave(param, callback) {
	axios.post(leaveUrl, param).then(data => {
		if (data !== undefined && data !== '' && data !== null) {
			callback(data)
		}
	})
}
// 根据id恢复员工职位
export function restore(param, callback) {
  axios.post(restoreUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}


