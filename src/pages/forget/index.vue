<template>
  <div class="login_container">
    <h5 class="login_register" @click="changeRegFlag">Login</h5>
    <h1>Change Password</h1>
    <el-form :model="loginForm" ref="loginForm" :rules="loginFormRules" label-width="160px">
      <el-form-item label="Email" prop="email" :disabled="!pass1&&!pass2&&!pass3">
        <el-input v-model="loginForm.email"></el-input>
      </el-form-item>
      <el-form-item  prop="answer" v-if="pass1&&!pass2">
        <p>{{ loginForm.question }}</p>
        <el-input v-model="loginForm.answer"></el-input>
      </el-form-item>
      <el-form-item label="New password" prop="password" v-if="pass1&&pass2">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkEmail" v-show="!pass1&&!pass2">Next</el-button>
        <el-button type="primary" @click="checkAnswer" v-show="pass1&&!pass2">Next</el-button>
        <el-button type="primary" @click="changePass" v-show="pass1&&pass2">Finish</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        email: '',
        answer: '',
        question: '',
        password: '',
      },
      pass1: false,
      pass2: false,
      pass3: false,
      loginFormRules: {
        password: [
          { required: true, message: 'please enter your password', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: 'A name should length between 6 and 15.',
            trigger: 'blur'
          }
        ],
        email: [
          {required: true, message: 'please enter your email', trigger: 'blur'}
        ],
        answer: [
          {required: true, message: 'please choose at least one type', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    checkEmail () {
      this.$refs.loginForm.validate(valid => {
        if(valid) {
          axios.post('/api/users/getQuestion', this.loginForm).then(res => {
            if(res.status !==200) {
              this.$message.error('Get error:' + res.meta.msg + '!')
              this.pass1 = false
            } else if(res.data.errorCode == 1){
              this.$message.error(res.data.msg)
              this.pass1 = false
            } else {
              this.loginForm.question = res.data.data[0].question
              console.log(this.loginForm.question)
              console.log(res.data.data[0].question)
              this.pass1 = true
            }
          })
        }
      })
    },
    checkAnswer () {
      this.$refs.loginForm.validate(valid => {
        if(valid) {
          axios.post('/api/users/getAnswer', this.loginForm).then(res => {
            if(res.status !==200) {
              this.$message.error('Get error:' + res.meta.msg + '!')
              this.pass2 = false
            } else if(res.data.errorCode == 1){
              this.$message.error(res.data.msg)
              this.pass2 = false
            } else {
              this.pass2 = true
            }
          })
        }
      })
    },
    changePass () {
      this.$refs.loginForm.validate(valid => {
        if(valid) {
          axios.post('/api/users/updateUsers', this.loginForm).then(res => {
            if(res.status !==200) {
              this.$message.error('Get error:' + res.meta.msg + '!')
            } else if(res.data.errorCode == 1){
              this.$message.error(res.data.msg)
            } else {
              this.$message.success('Password changed successfully, please login.')
              setTimeout(()=>{
                this.changeRegFlag()
              },1000)
            }
          })
        }
      })
    },
    changeRegFlag () {
      this.$router.push('/user/login')
    },
  }

}
</script>

<style>
.login_container {
  width: 50%;
  margin: 0 auto;
}
.login_register {
  text-align: right;
}
</style>
