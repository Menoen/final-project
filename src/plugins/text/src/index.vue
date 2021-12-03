<!--test.vue-->
<template>
  <div class="qk-text">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'QkText',
  props: {
    text: {
      type: String,
      default: 'This is a text'
    }
  },
  data () {
    return {
      defaultStyle: {
        height: 40
      }
    }
  }
}
</script>

<style>

</style>
