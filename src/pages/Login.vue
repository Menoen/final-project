<template>
  <div class="login_container">
    <h5 class="login_register" @click="changeRegFlag">{{registerFlag?'Login':'Register'}}</h5>
    <h1>{{registerFlag?'Register':'Login'}}</h1>
    <el-form :model="loginForm" ref="loginForm" :rules="loginFormRules" label-width="80px">
      <el-form-item label="username" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="nickname" prop="nickname" v-if="registerFlag">
        <el-input v-model="loginForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item label="email" prop="email" v-if="registerFlag">
        <el-input v-model="loginForm.email"></el-input>
      </el-form-item>
      <el-form-item label="types" prop="types" v-if="registerFlag">
        <el-radio-group v-model="loginForm.types">
          <el-radio :label="item.id" :key="item.id" v-for="item in typelist">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Question" prop="question" v-if="registerFlag">
        <el-input v-model="loginForm.question"></el-input>
      </el-form-item>
      <el-form-item label="Answer" prop="answer" v-if="registerFlag">
        <el-input v-model="loginForm.answer"></el-input>
      </el-form-item>
      <el-form-item>
        <a @click="forgetPass" v-show="!registerFlag">Forget Password</a>
        <el-button type="primary" @click="createUser" v-show="registerFlag">Register</el-button>
        <el-button type="primary" @click="login" v-show="!registerFlag">Login</el-button>
        <el-button type="info" @click="resetLoginForm">cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
const typelist = [{
  id: 0,
  name: 'Designer'
}, {
  id: 1,
  name: 'Developer'
}]
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        nickname: '',
        email: '',
        types: 0
      },
      typelist: typelist,
      registerFlag: false,
      loginFormRules: {
        username: [
          { required: true,
            message: 'please enter your username',
            trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: 'The name should length between 3 and 10.',
            trigger: 'blur'
          }
        ],
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
        types: [
          {required: true, message: 'please choose at least one type', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      console.log(this.$refs)
      this.$refs.loginForm.resetFields()
    },
    login () {
      console.log(this.loginFormRules)
      this.$refs.loginForm.validate(valid => {
        if(valid) {
          axios.post('/api/users/login', this.loginForm).then(res => {
            if(res.status !==200) {
              this.$message.error('Login error!')
            } else if(res.data.errorCode !== 0){
              this.$message.error(res.data.msg)
            } else {
              this.$message.success('Login Success!')
              // this.$cookies.set("username", this.loginForm.username)
              this.$router.push('/editor')
            }
          })
        }
      })
    },
    createUser() {
      this.$refs.loginForm.validate(valid => {
        if(valid) {
          axios.post('/api/users/addUsers', this.loginForm).then(res => {
            if(res.status !==200) {
              this.$message.error('Register error:' + res.meta.msg + '!')
            } else if(res.data.errorCode == 1){
              this.$message.error(res.data.msg)
            } else if(res.data.errorCode == 2){
              this.$message.error(res.data.msg)
              this.changeRegFlag()
            } else {
              this.$message.success('Register Success!')
              this.$router.push('/user/login')
            }
          })
        }
      })
    }, 
    changeRegFlag () {
      this.registerFlag = !this.registerFlag 
      this.resetLoginForm()
    },
    forgetPass () {
      this.$router.push('/user/forget')
    }
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
