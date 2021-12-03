<template>
  <div class="components-page-header">
    <div class="page-header-inner">
      <div class="user-wrapper">
        <a>{{username}}</a>
        <el-button v-if="login===false">Register</el-button>
        <el-button v-if="login===true" @click="logout">LogOut</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    fullWidth: Boolean
  },
  components: {
  },

  mounted: function() {
    this.getName()
  },
  data () {
    return {
      login: true,
      username:""
    }
  },
  methods: {
    getName() {
      this.username = this.$cookies.get('username')
    },
    logout () {
      this.$message.success('You already logout')
      this.$cookies.remove('username')
      this.$router.push('/user/login')
    },
  }
}
</script>

<style>
.components-page-header {
  height: 100%;
  background: white;
  box-shadow: 0 2px 3px 0 rgba(100, 100, 100, 0.06);
}

.page-header-inner {
  display: flex;
}
.page-header-inner.fullWidth {
  padding: 0 18px;
}

.logo-wrapper {
  width: 360px;
  font-size: 18px;
  line-height: 48px;
}
.logo-wrapper img {
  display: inline-block;
  height: 30px;
  vertical-align: middle;
}
.logo-wrapper span {
  display: inline-block;
  vertical-align: middle;
}

.header-center-wrapper {
  flex: 1;
  text-align: center;
}

.user-wrapper {
  text-align: right;
  width: 95%;
  padding-top: 6px;
}
</style>
