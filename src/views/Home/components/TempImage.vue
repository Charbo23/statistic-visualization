<template>
  <div class="temp-image">
  </div>
</template>

<script>
export default {
  name: 'TempImage',
  data() {
    return {};
  }
}
</script>

<style lang="scss" scoped>
.temp-image{
  width:100%;
  height: 100%;
  background-image: url("~@/assets/images/temp_image.png");
  background-size: 100% 100%;
}
</style>