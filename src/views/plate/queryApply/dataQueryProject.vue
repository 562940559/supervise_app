<template>
  <div class="dataQueryProject-wrap">
    <div class="title">请选择查询项目名称：</div>
    <div class="plate">
      <span
        v-for="(item,index) in plateList"
        :key="index"
        @click="select(item)"
        :class="item.isAcitve == true ? 'active' : ''"
      >{{item.name}}</span>
    </div>
    <div style="clear: both;"></div>
    <div class="btn-wrap">
      <span @click="sureSelect()">确认</span>
    </div>
  </div>
</template>

<script>
let fromName = ""; // 保存上一个路由路径
import { Toast } from "vant";
export default {
  data() {
    return {
      plateList: [
        { name: "企业工商登记信息", isAcitve: false },
        { name: "企业信用信息", isAcitve: false },
        { name: "财务数据", isAcitve: false },
        { name: "党员数据", isAcitve: false },
        { name: "村两委人员数据", isAcitve: false },
        { name: "新区集群注册企业信息", isAcitve: false },
        { name: "耕地占用批文", isAcitve: false },
        { name: "出让土地数据", isAcitve: false },
        { name: "存量房成交数据", isAcitve: false },
        { name: "“一学一测”测验数据", isAcitve: false },
        { name: "河流主要流域污染物数据及空气质量六项污染物", isAcitve: false },
        { name: "高龄补贴数据", isAcitve: false },
        { name: "公车基本数据、加油、维保、租车数据", isAcitve: false },
        { name: "殡葬补贴数据", isAcitve: false },
        { name: "财政支付数据", isAcitve: false },
        { name: "二手房交易数据", isAcitve: false },
        { name: "房屋销售网签备案数据 ", isAcitve: false },
        { name: "招引企业税收数据", isAcitve: false },
        { name: "公积金个人缴存、提取数据", isAcitve: false },
        { name: "车辆信息", isAcitve: false },
        {
          name: "获得创业启动奖补资金和天府英才计划奖补资金的企业税收数据",
          isAcitve: false
        },
        { name: "社保—缴保单位信息", isAcitve: false },
        { name: "政府采购招标、投标数据", isAcitve: false },
        { name: "政府专项资金", isAcitve: false },
        { name: "个人参股企业信息", isAcitve: false },
        { name: "刑事处罚等4类", isAcitve: false },
        { name: "学籍信息等2类", isAcitve: false },
        { name: "律师执业等3类", isAcitve: false },
        { name: "专利等2类", isAcitve: false },
        { name: "参保信息等16类", isAcitve: false },
        { name: "身份信息等9类", isAcitve: false },
        { name: "成都志愿者信息", isAcitve: false },
        { name: "婚姻登记信息等12类", isAcitve: false },
        { name: "小额贷款公司高管核准信息等2类", isAcitve: false },
        { name: "劳动模范信息", isAcitve: false },
        { name: "残疾人信息", isAcitve: false },
        { name: "集体土地使用权信息等4类", isAcitve: false },
        { name: "贷款等2类", isAcitve: false },
        { name: "房地产销售服务等5类", isAcitve: false },
        { name: "个人不良信用记录信息", isAcitve: false },
        { name: "农村土地承包经营权等2类", isAcitve: false },
        { name: "林权", isAcitve: false },
        { name: "纳税记录等2类", isAcitve: false },
        { name: "生育登记等10类", isAcitve: false },
        { name: "电信运营商等4类数据", isAcitve: false }
      ],
      selectedList: new Array()
    };
  },
  beforeRouteEnter(to, from, next) {
    fromName = from.name;
    next();
  },
  created() {
    // 将已经选择的选项转换成数组
    // 已经选择的放入selected中
    let str = this.$route.query.item;
    let arr = str.split(",");
    if (arr[0] == "" || arr[0] == "请选择") {
      return false;
    }
    this.selectedList = arr;
    // 遍历出对应元素改变active属性
    for (let a in arr) {
      for (let b in this.plateList) {
        if (this.plateList[b].name == arr[a]) {
          this.plateList[b].isAcitve = true;
        }
      }
    }
  },
  mounted() {},
  methods: {
    select(item) {
      // 如果点击后是选中状态就添加
      // 如果点击后是未选中状态就遍历之后进行删除
      item.isAcitve = !item.isAcitve;
      if (item.isAcitve) {
        return this.selectedList.push(item.name);
      } else {
        for (let i = 0, iLen = this.selectedList.length; i < iLen; i++) {
          if (this.selectedList[i] === item.name) {
            return this.selectedList.splice(i, 1);
          }
        }
      }
    },
    sureSelect() {
      // 提交选择
      if (this.selectedList[0] == undefined) {
        return Toast("请选择至少一个项目！");
      }
      let haveSelected = this.selectedList.join(",");
      if (fromName == "查询申请") {
        return this.$router.replace({
          path: "/addQueryApply",
          query: { haveSelected: haveSelected }
        });
      } else {
        return this.$router.replace({
          path: "/editQuery",
          query: { haveSelected: haveSelected }
        });
      }
    }
  }
};
</script>

<style scoped lang="less" type="text/less">
@import "../../../assets/less/common.less";
.dataQueryProject-wrap {
  box-sizing: border-box;
  padding: 80 / @size 20 / @size 0 20 / @size;
  min-height: 100%;
  .title {
    color: #323232;
    font-size: 26 / @size;
    font-weight: 600;
    height: 70 / @size;
    line-height: 70 / @size;
  }
  .plate {
    span {
      float: left;
      display: block;
      font-size: 20 / @size;
      padding: 5 / @size 20 / @size;
      margin-right: 20 / @size;
      background-color: #dcdcdc;
      color: #3d4139;
      border-radius: 25 / @size;
      margin-bottom: 15 / @size;
    }
    .active {
      background-color: #73d5be;
      color: #fff;
    }
  }
  .btn-wrap {
    margin: 20 / @size 0;
    text-align: center;
    span {
      display: inline-block;
      color: white;
      background-color: #73d5be;
      font-size: 22 / @size;
      text-align: center;
      height: 50 / @size;
      line-height: 50 / @size;
      width: 100 / @size;
      border-radius: 20 / @size;
    }
  }
}
</style>