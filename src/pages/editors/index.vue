<template>
<div>
  <fm-making-form 
    ref="makingform" 
    style="height: 500px;" 
    preview 
    generate-code 
    generate-json
  >
    <template slot="action">
    </template>
  </fm-making-form>
  
    <div class="newClass">Bottom</div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.newClass {
  position: fixed;
  width: 100%;
  height: 30px;
  right: 0;
  bottom: 20px;
  background-color: #fff;
}
</style>
