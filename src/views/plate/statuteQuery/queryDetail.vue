<template>
  <div class="queryDetail-wrap">
    <div v-html="title" class="title"></div>
    <div v-html="content.replace(/\r?\n/g, '<br />')" class="content"></div>
  </div>
</template>

<script>
import * as $api from '@/api';
import aes from '../../../utils/aes';
export default {
  data() {
    return {
      title: '',
      content: '',
      form: {
        id: ''
      },
    }
  },
  methods: {
    getStatuteDetail() {
      var info = aes.encrypt(JSON.stringify(this.form));
      let data = `"requestData": "${info}"`
      this.$api.work.getStatuteDetail(data)
      .then(res=>{
        this.title = res.title;
        this.content = res.content;
      })
    }
  },
  mounted() {
    this.form.id = this.$route.query.id;
    this.getStatuteDetail();
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.queryDetail-wrap {
  box-sizing: border-box;
  padding: 80/@size 15/@size 15/@size 15/@size;
  .title {
    width: 100%;
    font-size: 24/@size;
    margin: 20/@size 0;
  }
  .content {
    font-size: 20/@size;
    color: #5c5c5c;
  }
}
</style>