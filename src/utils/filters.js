/**
 * Created by Administrator on 2017/5/12 0012.
 */
export const priceNumber = (str) => {
    if (!str) return ''
    let re = /([0-9]+.[0-9]{2})[0-9]*/;
    let target = str.toString().replace(re,"$1");
    return parseFloat(target).toLocaleString()
}

export const sexFilter = sex => sex === '1' ? '男' : '女'

export const staffStatusFilter = status => {
	const obj = {
		'1': '正常',
		'2': '未激活',
		'3': '锁定',
		'4': '休息中',
		'5': '可接单',
		'6': '删除',
		'7': '工作中',
		'8': '已禁用'
	}

	return obj[status]
}

// 个人中心 维修资质
export const qualifiedFilter = number => {
	const type = {
		'0': '一类',
		'1': '二类',
		'2': '三类',
		'3': '四类',
	}
	return type[number]
}
export const userTypeName = type =>{
	const name = {
		'4':'厂商',
		'10':'轮胎店',
		'13':'汽油店'
	}
	return name[type]
}