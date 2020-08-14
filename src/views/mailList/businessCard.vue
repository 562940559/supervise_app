<template>
  <div class="businessCard-wrap">
    <div class="topWrap">
      <p class="userHeadImg">{{formatUserHeadImg(name)}}</p>
      <p>{{name}}</p>
    </div>
    <div 
      class="info-wrap"
      v-for="(item,index) in this.infoList"
      :key="index"
    >
      <img :src="item.imgPath" alt="">
      <span>{{item.name}}</span>
      <span :style="{color: item.color}" @click="dial(item)">{{item.info == '' ? '无' : item.info}}</span>
    </div>
    <div class="send-wrap">
      <p @click="send()"><van-icon name="chat-o" />发消息</p>
    </div>
  </div>
</template>

<script>
import { Dialog,Toast } from 'vant';
export default {
  data() {
    return {
      info: '',
      name: '',
      infoList: [{
        imgPath: './static/img/mailList/bumen.png',
        name: '部门',
        info: '',
        color: '#7E7E7E'
      },{
        imgPath: './static/img/mailList/zhiwei.png',
        name: '职位',
        info: '',
        color: '#7E7E7E'
      },{
        imgPath: './static/img/mailList/shouji.png',
        name: '手机',
        info: '',
        color: '#586B95',
        canClick: true
      },{
        imgPath: './static/img/mailList/zuoji.png',
        name: '座机',
        info: '',
        color: '#586B95',
        canClick: true
      },]
    } 
  },
  methods: {
    formatUserHeadImg(name) {
      if(name) {
        if(name.length <= 2) {
          return name.substring(0, 2)
        }if(name.length == 3) {
          return name.substring(1,3)
        }if(name.length > 3) {
          return name.substring(2,4)
        }
      }
    },
    dial(item) {
      if(!item.canClick) {
        return
      }if(item.info == '' || item.info == '无') {
        return
      }
      Dialog.confirm({
        title: '拨打电话',
        message: `确认要拨打电话给${item.info}吗？`
      }).then(() => {
        if (window.plus) {
          plus.device.dial(item.info, true);
        }else {
          console.log(item.info)
        }
      }).catch(() => {
      });
    },
    send() {
      var item = this.info;
      var this_Account = localStorage.getItem('account')
      if(item.userAccount == null || item.userId == null) {
        Toast('此用户在系统中无账号')
        return
      }
      if(item.userAccount == this_Account){
        Toast('请不要给自己发消息')
        return 
      }
      localStorage.setItem('currentPersonChatInfo',JSON.stringify(item))
      this.$router.push('/chatDetail')
    }
  },
  mounted() {
    this.$set(this.infoList[0],'info',this.info.deptName)
    this.$set(this.infoList[1],'info',this.info.roleName)
    this.$set(this.infoList[2],'info',this.info.mobilePhone)
    this.$set(this.infoList[3],'info',this.info.officePhone)
    this.name = this.info.name;
  },
  created() {
    this.info = JSON.parse(localStorage.getItem('card'));
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.businessCard-wrap {
  width: 100%;
  min-height: 100%;
  padding-top: 80/@size;
  box-sizing: border-box;
  background-color: rgb(249,249,251);
  .topWrap {
    width: 100%;
    height: 250/@size;
    background: url('../../../static/img/mailList/topBusinessCard.png') no-repeat;
    background-size: 100% 100%; 
    box-sizing: border-box;
    padding-top: 100/@size;
    text-align: center;
    .userHeadImg {
      width: 100/@size;
      height: 100/@size;
      text-align: center;
      line-height: 100/@size;
      font-size: 30/@size;
      background-color: rgb(51,150,251);
      color: white;
      border-radius: 50%;
      margin: 0 auto;
    }
    p {
      font-size: 22/@size;
      height: 40/@size;
      line-height: 40/@size;
      color: #323232;
      font-family:Source Han Sans CN;
    }
  }
  .info-wrap {
    width: 100%;
    height: 80/@size;
    box-sizing: border-box;
    padding: 0 20/@size;
    border-bottom: 1px solid #eee;
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    img {
      width: 30/@size;
      height: 30/@size;
    }
    span {
      font-size: 24/@size;
      color: #323232;
      margin-left: 30/@size;
      font-family:Source Han Sans CN;
      white-space: nowrap;
    }
    span:nth-child(3) {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .send-wrap {
    width: 100%;
    height: 80/@size;
    line-height: 80/@size;
    margin-top: 15/@size;
    text-align: center;
    background-color: #fff;
    p {
      font-size: 26/@size;
      color: #586B95;
      font-family:Source Han Sans CN;
      i {
        font-size: 30/@size;
        position: relative;
        left: -10/@size;
        top: 5/@size;
      }
    }
  }
}
</style>