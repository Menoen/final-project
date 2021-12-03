<template>

</template>

<script>
import axios from 'axios'
// import formEdit from './components/form-edit'

export default {
  components: {
  },
  data () {
    return {
      users:{}
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    getAllUsers() {
      axios.get('/api/users/selectAllUsers').then(res => {
        if(res.status !==200) {
          this.$message.error('Fetch error:' + res.msg + '!')
        } else if(res.data.errorCode == 1){
          this.$message.error(res.data.msg)
        } else if(res.data.errorCode == 2){
          this.user = {}
        } else {
          this.user = res.data.users
        }
        
      })
    }
  }
}
</script>

<style>
</style>
