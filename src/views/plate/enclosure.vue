<template>
  <div class="fileBasisWrap">
    <div class="descriptionWrap"
      v-for="(file, index) in fileList"
      :key="index"
    >
      <span class="imgWrap">
        <img 
          src="../../../assets/img/plate/createTask/doc.png" alt="doc"
          v-if="file.oldFileName.split('.')[1] == 'doc'"
        >
        <img 
          src="../../../assets/img/plate/createTask/xls.png" alt="xls"
          v-if="file.oldFileName.split('.')[1] == 'xls'"
        >
        <img 
          src="../../../assets/img/plate/createTask/pdf.png" alt="pdf"
          v-if="file.oldFileName.split('.')[1] == 'pdf'"
        >
      </span>
      <span>{{file.oldFileName}}</span>
    </div>
    <van-divider>无更多信息</van-divider>
  </div>
</template>

<script>
import * as $api from '@/api';
export default {
  data() {
    return {
      fileList: {}
    }
  },
  mounted() {
    let fileList = this.$route.query.fileList;
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.fileBasisWrap {
  width: 100%;
  padding-top: 80/@size;

  .descriptionWrap {
    width: 100%;
    height: 100/@size;
    box-sizing: border-box;
    padding: 0 40/@size;
    border-bottom: 1/@size solid #dcdcdc;
    span {
      display: inline-block;
      width: 400/@size;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      height: 100/@size;
      line-height: 100/@size;
      font-size: 20/@size;
    }
    .imgWrap {
      width: 50/@size;
      margin-right: 10/@size;
      text-align: center;
      box-sizing: border-box;
      padding-top: 20/@size;
      img {
        width: 50/@size;
        height: 60/@size;
      }
    }
  }
}
</style>