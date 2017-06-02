<template>
	<div>
    <div class="bead-title">
      <mis-breadcrumb separator="-" :attr="[{name: '账户管理', to: '/accountManage'},{name: titleName}]"></mis-breadcrumb>
    </div>

    <div class="identify-main">
      <mis-title :title="titleName"></mis-title>
      <div class="identify-content">
        <div class="form-box">
          <el-form :label-position="'right'" label-width="100px" :model="userForm" :rules="rules" ref="userForm">
            <el-form-item label="姓名" prop="username">
              <el-input v-model="userForm.username" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="idCard">
              <el-input v-model="userForm.idCard" placeholder="请输入身份证号码"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span style="margin-left: 100px;color: #bfcbd9">注：请确保身份证号码的真实性，否则会影响账户资金交易提现等操作</span>


        <div class="bottom-btn">
          <el-button type="danger" style="width: 100px" @click="submitForm('userForm')">确认</el-button>
        </div>
      </div>
    </div>
	</div>
</template>

<script type="text/ecmascript-6">
  import misBreadcrumb from '@/components/breadcrumb'
  import misTitle from '@/components/title'

  export default{
    data(){
      return {
        titleName:'实名认证',
        userForm:{
          idCard:'',
          username:'',
        },
        rules:{
          username: [
                  { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
          idCard: [
                  { required: true, message: '请输入身份证号码', trigger: 'blur' },
                  { min: 18, max: 19, message: '请输入正确的身份证号码', trigger: 'blur' }
          ]
        }
      }
    },
    created(){

    },
    methods:{
      submitForm(formName){
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
    components:{
      misBreadcrumb,
      misTitle
    }
  }
</script>

<style lang="less" scoped>
  .bead-title{
    padding-left: 20px;
    margin-bottom: 20px;
  }

  .identify-main{
    background: #fff;
    min-height: 500px;

    .identify-content{
      border-top: 1px solid #ddd;
      padding: 70px 0 70px 60px;
      .form-box{
        width: 400px;
      }
      .bottom-btn{
        margin-top: 80px;
        padding-left: 100px;
      }
    }
  }
</style>
