/**
 * 接口地址
 */

import { baseUrl } from '@/config/env'

/**
 * 公共接口
 */

// 图片上传
export const upload = '/agent/tfile/upload'

/**
 * 登录注册
 */

// 手机密码登录
export const login = '/agent/login/login'
// 手机验证码登录
export const verifyLogin = '/agent/login/verifyLogin'
// 获取手机验证码
export const getVerifyCode = '/agent/login/getVerifyCode'

/**
 * 个人中心
 */

// 个人信息
export const userInfo = '/agent/center/detail'

// 退出登录
export const logout = '/agent/center/logout'

// 编辑管理员信息
export const editUserInfo ='/agent/center/edit'

/**
 * 员工管理
 */

// 员工列表
export const staffList = '/agent/staff/list'
// 添加员工
export const staffAdd = '/agent/staff/add'
// 编辑员工
export const staffEdit = '/agent/staff/edit'
// 删除员工
export const staffDel = '/agent/staff/delete'
// 员工详情
export const staffDetail = '/agent/staff/detail'

/**
 * 品牌相关
 */

// 获取厂家品牌列表
export const getFactoryBrand = '/agent/truck/getFactoryBrand'
// 获取发动机品牌列表
export const getEngineBrand = '/agent/truck/getEngineBrand'
// 获取变速器品牌列表
export const getTransBrand = '/agent/truck/getTransBrand'

/**
 * 业务配置
 */

// 获取业务列表
export const businessList = '/agent/Business/list'

// 业务添加
export const  addBusiness = '/agent/Business/add'
// 编辑业务
export const  editBusiness = 'agent/Business/edit'

// 轮胎品牌
export const getTireBrands = '/agent/Goods/getTireBrands'
//获取轮胎型号
export const getTireModels = 'agent/Goods/getTireModels'
// 获取轮胎花纹
export const getStripes = '/agent/Goods/getStripes'