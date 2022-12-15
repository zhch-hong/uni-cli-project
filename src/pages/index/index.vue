<template>
  <view>
    <image :src="`${ASSETS_HOST}/return.png`"></image>
    <image :src="`${ASSETS_HOST}/auto.png`"></image>
    <image :src="`${ASSETS_HOST}/bussiness-man.png`"></image>
    <image :src="`${ASSETS_HOST}/clock.png`"></image>
    <button @click="handleSubmit">提交表单</button>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { throttle } from 'lodash';

@Component
export default class Index extends Vue {
  readonly ASSETS_HOST = process.env.VUE_APP_ASSETS_HOST;
  imageSrc = `${process.env.VUE_APP_ASSETS_HOST}/return.png`;

  created() {
    console.log('created');
  }

  mounted() {
    console.log('mounted');
  }

  onLoad() {
    console.log('onLoad');
  }

  onShow() {
    console.log('onShow');
    setTimeout(() => {
      this.imageSrc = `${process.env.VUE_APP_ASSETS_HOST}/clock.png`;
    }, 2000);
  }

  handleSubmit = throttle(function () {
    console.log(this.imageSrc);
  }, 3000);
}
</script>
