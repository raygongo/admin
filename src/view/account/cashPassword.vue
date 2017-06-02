<template>
    <div>
        <div class="bead-title">
            <mis-breadcrumb separator="-" :attr="[{name: '账户管理', to: '/accountManage'},{name: titleName}]"></mis-breadcrumb>
        </div>
    
        <div class="main">
            <mis-title :title="titleName"></mis-title>
    
            <div class="form-content">
                <div class="form-box">
                    <el-form :label-position="'right'" label-width="100px" :model="userForm" :rules="rules" ref="userForm">
                        <el-form-item label="提现密码" prop="cashPWD">
                            <el-input v-model="userForm.cashPWD" placeholder="请设置提现密码"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="tel">
                            <el-input v-model="userForm.tel" placeholder="请输入手机号码" style="width: 64%;"></el-input>
                            <el-button type="success">获取验证码</el-button>
                        </el-form-item>
                        <el-form-item label="短信验证码" prop="validateMsg">
                            <el-input v-model="userForm.validateMsg" placeholder="请输入短信验证码"></el-input>
                        </el-form-item>
                        <span class="validate-msg-btn" @click="showDialog = true" >收不到验证码?</span>
                    </el-form>
                </div>
    
                <div class="bottom-btn">
                    <el-button type="danger" style="width: 100px" @click="submitForm('userForm')">确认</el-button>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="showDialog" size="small">
            <div class="mis-dialog">
                <div class="dialog-title">收不到验证码?</div>
                <div class="dialog-info">验证码一般会在2-10分钟内发送到用户手机，请耐心等待！
                    </br>
                    如收不到短信验证码：
                </div>
                <ul class="dialog-warning">
                    <li>1.请检查输入手机号码是否有误</li>
                    <li>2.请检查手机网通信信号是否良好</li>
                    <li>3.检查无误仍然收不到短信验证码请联系客服&nbsp;400-892-2017</li>
                </ul>
    
            </div>
            <img class="bg-cat" src="static/image/dialog_cat.png" alt="">
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import misBreadcrumb from '@/components/breadcrumb'
    import misTitle from '@/components/title'
    
    export default {
        data() {
            return {
                titleName: '提现密码',
                userForm: {
                    cashPWD: '',
                    tel: '',
                    validateMsg: ''
                },
                rules: {
                    cashPWD: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }, ],
                    tel: [{
                        required: true,
                        message: '请输入支付宝账户号码',
                        trigger: 'blur'
                    }, ],
                    validateMsg: [{
                        required: true,
                        message: '请输入短信验证码',
                        trigger: 'blur'
                    }, ],
                },
                showDialog: false,
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('提交!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        created() {
    
        },
        components: {
            misBreadcrumb,
            misTitle
        }
    }
</script>

<style lang="less">
    .bead-title {
        padding-left: 20px;
        margin-bottom: 20px;
    }
    
    .main {
        background: #fff;
        min-height: 500px;
        .form-content {
            border-top: 1px solid #ddd;
            padding: 70px 0 70px 60px;
            .form-box {
                width: 400px;
                .validate-msg-btn {
                    cursor: pointer;
                    margin-left: 100px;
                    margin-top: 20px;
                }
            }
            .bottom-btn {
                margin-top: 80px;
                padding-left: 100px;
            }
        }
    }
    
    .mis-dialog {
        padding: 0 7%;
        position: relative;
        .dialog-title {
            font-size: 20px;
            padding-bottom: 30px;
            border-bottom: 1px solid #ddd;
        }
        .dialog-info {
            margin: 30px 0;
            line-height: 1.6;
        }
        .dialog-warning {
            &>li {
                line-height: 1.6;
            }
            margin-bottom: 100px;
        }
    }
    
    .bg-cat {
        position: absolute;
        left: -20px;
        bottom: -14px;
    }
</style>
