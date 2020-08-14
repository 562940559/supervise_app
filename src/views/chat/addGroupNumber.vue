<template>
  <div class="addGroupChat-wrap">
    <!-- checkbox-group包在最外层 -->
    <van-checkbox-group v-model="result">
    <div class="top-wrap">
      <span class="route-title" @click="routerBack()"><van-icon name="arrow-left" />{{$route.meta.title}} </span>
      <button class="sure-btn" v-if="!result.length">确定</button>
      <button class="sure-btn canClick" @click="sureAddGroupNumber()" v-else>确定({{result.length}})</button>
    </div>
    <div class="search-wrap" v-show="result.length != 0">
      <div class="selectedList">
        <!-- 遍历显示已经选择的用户 -->
        <p class="userHeadImg" 
          v-for="(item,index) in result"
          :key="index"
        >{{formatUserHeadImg(item.name)}}</p>
        <p style="clear: both;"></p>
      </div>
    </div>
    <!-- 委办领导 -->
    <div class="sec-department" v-if="this.canRead">
      <div class="img-wrap">
        <img src="../../../static/img/mailList/fgld.png" alt="">
      </div>
      <div class="coll-wrap">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            :title="'委办领导'+' ( '+mailList.allDepartment.leader.length+' ) '" 
            name="0"
          >
            <div
              class="addressBooks-wrap"
              v-for="(item,index) in mailList.allDepartment.leader"
              :key="index"
            >
              <van-checkbox :name="item" :disabled="item.disabled">
                <span class="userHeadImg">{{formatUserHeadImg(item.name)}}</span>
                <span>{{item.name}}</span>
              </van-checkbox>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div style="clear: both;"></div>
    </div>
    <!-- 纪检监察 -->
    <div class="sec-department" v-if="this.canRead">
      <div class="img-wrap">
        <img src="../../../static/img/mailList/JJJC.png" alt="">
      </div>
      <div class="coll-wrap">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            :title="'纪检监察'+' ( '+mailList.jjjc.addressBooks.length+' ) '" 
            name="1"
          >
            <van-collapse v-model="activeNameSecond" accordion>
              <van-collapse-item
                v-for="(item,index) in mailList.jjjc.childNodes"
                :key="index"
                :title="item.fullname+' ( '+mailList.allDepartment.thirdGradeMap[item.fullname].addressBooks.length+' ) '" 
                :name='item.fullname'
                :change="changeColl()"
              >
              <div
                class="addressBooks-wrap"
                v-for="(item,index) in addressBooks"
                :key="index"
              >
                <van-checkbox :name="item" :disabled="item.disabled">
                  <span class="userHeadImg">{{formatUserHeadImg(item.name)}}</span>
                  <span>{{item.name}}</span>
                </van-checkbox>
              </div>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div style="clear: both;"></div>
    </div>
    <!-- 巡察办 -->
    <div class="sec-department" v-if="this.canRead">
      <div class="img-wrap">
        <img src="../../../static/img/mailList/XCB.png" alt="">
      </div>
      <div class="coll-wrap">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            :title="'巡察办'+' ( '+mailList.xcb.addressBooks.length+' ) '"
            name="2"
          >
           <van-collapse v-model="activeNameSecond" accordion>
              <van-collapse-item
                v-for="(item,index) in mailList.xcb.childNodes"
                :key="index"
                :title="item.fullname+' ( '+mailList.allDepartment.thirdGradeMap[item.fullname].addressBooks.length+' ) '" 
                :name='item.fullname'
                :change="changeColl()"
              >
              <div
                class="addressBooks-wrap"
                v-for="(item,index) in addressBooks"
                :key="index"
              >
                <van-checkbox :name="item" :disabled="item.disabled">
                  <span class="userHeadImg">{{formatUserHeadImg(item.name)}}</span>
                  <span>{{item.name}}</span>
                </van-checkbox>
              </div>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div style="clear: both;"></div>
    </div>
    <!-- 审计局 -->
    <div class="sec-department" v-if="this.canRead">
      <div class="img-wrap">
        <img src="../../../static/img/mailList/SJJ.png" alt="">
      </div>
      <div class="coll-wrap">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            :title="'审计局'+' ( '+mailList.sjj.addressBooks.length+' ) '" 
            name="3"
          >
            <van-collapse v-model="activeNameSecond" accordion>
              <van-collapse-item
                v-for="(item,index) in mailList.sjj.childNodes"
                :key="index"
                :title="item.fullname+' ( '+mailList.allDepartment.thirdGradeMap[item.fullname].addressBooks.length+' ) '" 
                :name='item.fullname'
                :change="changeColl()"
              >
              <div
                class="addressBooks-wrap"
                v-for="(item,index) in addressBooks"
                :key="index"
              >
                <van-checkbox :name="item" :disabled="item.disabled">
                  <span class="userHeadImg">{{formatUserHeadImg(item.name)}}</span>
                  <span>{{item.name}}</span>
                </van-checkbox>
              </div>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div style="clear: both;"></div>
    </div>
    </van-checkbox-group>
  </div>
</template>

<script>
import * as $api from '@/api';
import { Toast } from 'vant';
export default {
  data() {
    return {
      activeName: '', //一级下拉
      activeNameSecond: '', //二级下拉
      canRead: false,
      mailList: {
        sjj: '',
        xcb: '',
        jjjc: '',
        allDepartment: ''
      },
      addressBooks: '',
      result: [],
      members: [], // 人员名单（id数组）
      checked: [],
    }
  },
  created() {
    this.getList();
    console.log(this.$route.query.item)
    for(let a in this.$route.query.item.personList) {
      this.checked.push(this.$route.query.item.personList[a].userId)
    }
  },
  mounted() {

  },
  methods: {
    sureAddGroupNumber() {
      for(let a in this.result) {
        this.members.push(this.result[a].userId)
      }
      this.members = JSON.stringify(this.members)
      let id = this.$route.query.item.id;
      let data = {
        groupMembers: this.members
      }
      this.$api.chat.addGroupChatNumber(id,data)
      .then(res=>{
        Toast('添加成功');
        setTimeout(() => {
          this.$router.back('-1')
        }, 500);
      })
    },
    routerBack() {
      this.$router.back('-1')
    },
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
    getList() {
      this.$api.mailList.getMailTitle()
      .then(res=>{
        this.mailList.allDepartment = res;
        this.allNumber = this.mailList.allDepartment.top.addressBooks.length;
        this.mailList.sjj = res.secondary.审计局;
        this.mailList.xcb = res.secondary.巡察办;
        this.mailList.jjjc = res.secondary.纪检监察;
        this.canRead = true;
      })
    },
    changeColl() {
      if(this.activeNameSecond) {
        this.addressBooks = this.mailList.allDepartment.thirdGradeMap[this.activeNameSecond].addressBooks;
        for(let a in this.checked) {
          for(let b in this.addressBooks) {
            if(this.checked[a] == this.addressBooks[b].userId) {
              this.addressBooks[b]['disabled'] = true
            }
          }
        }
      }else {
        for(let a in this.checked) {
          for(let b in this.mailList.allDepartment.leader) {
            if(this.checked[a] == this.mailList.allDepartment.leader[b].userId) {
              this.mailList.allDepartment.leader[b]['disabled'] = true
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="less" type="text/less">
@import '../../assets/less/common.less';
.addGroupChat-wrap {
  .van-collapse-item__content {
    padding: 10px 0;
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
    border-width: 0;
  }
  .van-cell {
    padding: 10px 16px;
  }
  .van-checkbox__label span:nth-child(1) {
    margin-left: 15/@size;
  }
  .van-checkbox__label span:nth-child(2) {
    float: left;
    height: 60/@size;
    line-height: 60/@size;
    margin-left: 20/@size;
    font-size: 22/@size;
    color: #333;
  }
}
</style>
<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.addGroupChat-wrap {
  box-sizing: border-box;
  min-height: 100%;
  padding-top: 80/@size;

  .userHeadImg {
    width: 60/@size;
    height: 60/@size;
    text-align: center;
    line-height: 60/@size;
    font-size: 24/@size;
    background-color: rgb(51,150,251);
    color: white;
    border-radius: 50%;
  }

  .top-wrap {
    width: 100%;
    height: 80/@size;
    background-color: white;
    color: #323232;
    font-family: SourceHanSansCN;
    font-size: 16/@size;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 20/@size;
    position: fixed;
    top: 0;
    z-index: 9999;
    .route-title {
      font-size: 30/@size;
      text-align: left;
      font-family: Source Han Sans CN;
      i {
        font-size: 30/@size;
        position: relative;
        top: 4/@size;
        left: -5/@size;
      }
    }
    .sure-btn {
      width: 100/@size;
      height: 50/@size;
      font-size: 22/@size;
      line-height: 50/@size;
      background-color: #e5e5e5;
      color: #A6A6A6;
      font-family:Source Han Sans CN;
      outline: none;
      border: 1px solid transparent;
    }
    .canClick {
      background-color: #02AC61;
      color: white;
    }
  }

  .search-wrap {
    width: 100%;
    height: 100/@size;
    border-top: 10/@size solid rgb(249,249,249);
    border-bottom: 10/@size solid rgb(249,249,249);
    box-sizing: border-box;
    padding: 0 20/@size;
    .selectedList {
      max-width: 100%;
      box-sizing: border-box;
      padding: 10/@size 0;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space:nowrap;
      .userHeadImg {
        display: inline-block;
        margin-right: 10/@size;
      }
    }
  }

  .sec-department {
    box-sizing: border-box;
    width: 100%;
    padding-left: 20/@size;
    .img-wrap,.coll-wrap {
      float: left;
    }
    .img-wrap {
      width: 70/@size;
      height: 44px;
      text-align: center;
      line-height: 44px;
    }
    img {
      width: 30/@size;
      height: 30/@size;
      position: relative;
      top: 5/@size;
    }
    .coll-wrap {
      width: 440/@size;
      font-size: 24/@size;
      font-family:Source Han Sans CN;
      .addressBooks-wrap {
        padding: 15/@size 0;
        .userHeadImg {
          float: left;
        }
      }
    }
    
  }

}
</style>