<template>
  <view>
    <view style="margin: 20px">
      <u-button text="确定" @click="visible = true"></u-button>
      <view>{{ address }}</view>
    </view>
    <u-picker
      :show="visible"
      :columns="columns"
      keyName="name"
      @change="onPickerChange"
      @cancel="onPickerCancel"
      @confirm="onPickerConfirm"
    ></u-picker>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Index extends Vue {
  address = '';
  visible = false;
  indexs = [0, 0, 0];
  columns: [administrative.Province[], administrative.City[], administrative.Area[]] = [[], [], []];

  onLoad() {
    this.fetchProvinces();
  }

  fetchProvinces() {
    uni.request({
      url: `${process.env.VUE_APP_API_HOST}/administrative/provinces`,
      method: 'GET',
      success: ({ data }) => {
        const provincesData = data as administrative.Province[];
        this.columns[0] = provincesData;
        this.fetchCities(provincesData[0].code);
      },
    });
  }

  fetchCities(provinceCode: string) {
    uni.request({
      url: `${process.env.VUE_APP_API_HOST}/administrative/cities?provinceCode=${provinceCode}`,
      method: 'GET',
      success: ({ data }) => {
        const citiesData = data as administrative.City[];
        this.columns.splice(1, 1, citiesData);
        this.fetchAreas(citiesData[0].code);
      },
    });
  }

  fetchAreas(cityCode: string) {
    uni.request({
      url: `${process.env.VUE_APP_API_HOST}/administrative/areas?cityCode=${cityCode}`,
      method: 'GET',
      success: ({ data }) => {
        const areasData = data as administrative.Area[];
        this.columns.splice(2, 1, areasData);
      },
    });
  }

  onPickerChange(event: Record<string, unknown>) {
    const columnIndex = event.columnIndex as number;
    const index = event.index as number;

    if (columnIndex === 0) {
      this.fetchCities(this.columns[0][index].code);
      return;
    }

    if (columnIndex === 1) {
      this.fetchAreas(this.columns[1][index].code);
    }
  }

  onPickerCancel() {
    this.visible = false;
  }

  onPickerConfirm(event: Record<string, unknown>) {
    const value = event.value as [
      administrative.Province,
      administrative.City,
      administrative.Area
    ];
    this.address = `${value[0].name}${value[1].name}${value[2].name}`;
    this.visible = false;
  }
}
</script>
<style lang="scss" scoped>
.submit-icon {
  vertical-align: text-bottom;
}
</style>
