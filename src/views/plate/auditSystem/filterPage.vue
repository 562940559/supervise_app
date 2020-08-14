<template>
  <div class="filterPage-wrap">
    <div class="plateWrap">
      <span>项目名称</span>
      <input type="text" maxlength='100'
        v-model="form.projectName"
        placeholder="请输入项目名称，最多输入100个字符。"
      >
    </div>
    <div class="plateWrap">
      <span>项目业主</span>
      <input type="text" maxlength='100'
        v-model="form.projectOwners"
        placeholder="请输入项目业主，最多输入100个字符。"
      >
    </div>
    <div class="plateWrap">
      <span>选择项目类型</span>
      <span @click="showPicker('projectType')">{{form.projectType == '' ? '请选择' : form.projectType}}<van-icon name="arrow" /></span>
    </div>
    <div class="plateWrap">
      <span>选择审计方式</span>
      <span @click="showPicker('auditApproach')">{{form.auditApproach == '' ? '请选择' : form.auditApproach}}<van-icon name="arrow" /></span>
    </div>
    <div v-if="showstatus" class="plateWrap">
      <span>选择审计方式对应阶段状态</span>
      <span @click="showPicker('status')">{{form.status == '' ? '请选择' : form.status}}<van-icon name="arrow" /></span>
    </div>
    <div class="plateWrap">
      <span>选择项目状态</span>
      <span @click="showPicker('status2')">{{form.status2 == '' ? '请选择' : form.status2}}<van-icon name="arrow" /></span>
    </div>
    <div class="plateWrap">
      <span>年份</span>
      <span @click="showTimePicker=true">{{form.year == '' ? '请选择' : form.year+'年'}}<van-icon name="arrow" /></span>
    </div>
    <div class="plateWrap">
      <span>选择中介机构</span>
      <span @click="showPicker('chooseIntermediaryOrgan')">{{form.chooseIntermediaryOrgan == '' ? '请选择' : form.chooseIntermediaryOrgan}}<van-icon name="arrow" /></span>
    </div>
    <div class="btnGroup">
      <div class="btnWrap">
        <van-button type="default" @click="replay()" size="large">重置</van-button>
      </div>
      <div class="btnWrap">
        <van-button type="primary" @click="sureForm()" size="large">确认</van-button>
      </div>
      <div style="clear: both;"></div>
    </div>
    <!-- 弹出层 -->
    <van-popup 
      v-model="show"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :title="pickerTitle"
        :columns="pickerList"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 时间选择器 -->
    <van-popup 
      v-model="showTimePicker"
      position="bottom"
    >
      <van-datetime-picker
        v-model="auditSystemCurrentDate1"
        type="year-month"
        :min-date="minDate"
        :formatter="auditSystemformatter"
        @confirm="confirmTime"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import * as $api from '@/api';
import aes from '../../../utils/aes';
export default {
  data() {
    return {
      show: false, //是否显示pop弹出框
      showstatus: false,
      showstatus2: false,
      showTimePicker: false,
      pickerList: [], //选择器要显示的字段
      pickerTitle: '', //选择器的标题
      selectPicker: '', //当前选择器的类型
      auditSystemCurrentDate1: new Date(),
      minDate: new Date(2000,0,1),
      form: { 
        //提交的筛选条件
        current: 1, //页码
        limit: 10, //每页条数
        projectName: '', //项目名称
        projectOwners: '', //项目业主
        projectType: '', //项目类型
        status: '', //审计项目阶段状态
        status2: '', //项目状态
        auditApproach: '', //审计方式
        chooseIntermediaryOrgan: '', //中介机构
        year: '', //年份
      },
      list: {
        projectType: [
          '新建-房屋建筑工程','新建-公路工程','新建-市政基础设施',
          '新建-水利工程','改扩建-房屋建造工程','改扩建-公路工程','改扩建-市政基础设施',
          '改扩建-水利工程','房屋装饰装修','园林绿化工程','零星改造工程','电力迁改工程',
          '电力安装工程','其他'
        ],
        auditApproach: ['备案审计','直接审计'],
        statusOne1: ['未提交审核报告','已提交审核报告','已反馈备案文书'],
        statusOne2: ['审计结果未定案','审计结果已定案','已出具征求意见书','已归档'],
        statusTwo: ['已填写','已申请','已初审','已复核','初审未通过','复核未通过','已确认审计方式',],
        statusTwo0: [
          '已填写','已申请','已初审','已复核','初审未通过','复核未通过','已确认审计方式',
          '已摇号','组织方式通知书拟文稿处理中','待填写报告',
        ],
        statusTwo1: [
          '已填写','已申请','已初审','已复核','初审未通过','复核未通过','已确认审计方式',
          '已摇号','组织方式通知书拟文稿处理中','待填写报告',
          '待复核备案审计报告','复核备案审计报告不通过',
        ],
        statusTwo2: [
          '已填写','已申请','已初审','已复核','初审未通过','复核未通过','已确认审计方式',
          '已摇号','组织方式通知书拟文稿处理中','待填写报告',
          '待复核备案审计报告','复核备案审计报告不通过',
          '审计结果备案通知书处理中','审计结果审查备案意见书处理中','核查意见处理中','归档完成'
        ],
        statusTwo3: [
          '已填写','已申请','已初审','已复核','初审未通过','复核未通过','已确认审计方式',
          '待判断资料','待审核补充资料交接清单','补充资料初审通过','补充资料初审不通过',
          '补充资料复核通过','补充资料复核不通过','补充资料主任复核不通过',
          '补充资料主任复核通过','待制作审计通知书(资料合格)',
          '审计通知书处理中','待上传计算工程量','待上传工程量拟对稿(包含现场图片)',
          '待核对工程量时间','待协调处理争议问题','待上传三级复核表格','待上传审计初稿',
          '待复核审计初稿','待反馈审计初稿','待判断审计初稿',
          '审计初稿不合格','待审计结果定案',
        ],
        statusTwo4: [
          '已填写','已申请','已初审','已复核','初审未通过','复核未通过','已确认审计方式',
          '待判断资料','待审核补充资料交接清单','补充资料初审通过','补充资料初审不通过',
          '补充资料复核通过','补充资料复核不通过','补充资料主任复核不通过',
          '补充资料主任复核通过','待制作审计通知书(资料合格)',
          '审计通知书处理中','待上传计算工程量','待上传工程量拟对稿(包含现场图片)',
          '待核对工程量时间','待协调处理争议问题','待上传三级复核表格','待上传审计初稿',
          '待复核审计初稿','待反馈审计初稿','待判断审计初稿',
          '审计初稿不合格','待审计结果定案','待记录审计结果盖章时间'
        ],
        statusTwo5: [
          '已填写','已申请','已初审','已复核','初审未通过','复核未通过','已确认审计方式',
          '待判断资料','待审核补充资料交接清单','补充资料初审通过','补充资料初审不通过',
          '补充资料复核通过','补充资料复核不通过','补充资料主任复核不通过',
          '补充资料主任复核通过','待制作审计通知书(资料合格)',
          '审计通知书处理中','待上传计算工程量','待上传工程量拟对稿(包含现场图片)',
          '待核对工程量时间','待协调处理争议问题','待上传三级复核表格','待上传审计初稿',
          '待复核审计初稿','待反馈审计初稿','待判断审计初稿',
          '审计初稿不合格','待审计结果定案','待记录审计结果盖章时间','待上传审核报告',
          '待发送审计报告代理稿','待法制审核代拟稿','法制审核代拟稿不通过','征求意见书处理中','待反馈征求意见书'
        ],
        statusTwo6: [
          '已填写','已申请','已初审','已复核','初审未通过','复核未通过','已确认审计方式',
          '待判断资料','待审核补充资料交接清单','补充资料初审通过','补充资料初审不通过',
          '补充资料复核通过','补充资料复核不通过','补充资料主任复核不通过',
          '补充资料主任复核通过','待制作审计通知书(资料合格)',
          '审计通知书处理中','待上传计算工程量','待上传工程量拟对稿(包含现场图片)',
          '待核对工程量时间','待协调处理争议问题','待上传三级复核表格','待上传审计初稿',
          '待复核审计初稿','待反馈审计初稿','待判断审计初稿',
          '审计初稿不合格','待审计结果定案',
          '待记录审计结果盖章时间','待上传审核报告','待发送审计报告代理稿',
          '待法制审核代拟稿','法制审核代拟稿不通过','征求意见书处理中','待反馈征求意见书',
          '审计报告处理中','待归档','归档完成'
        ],
      }
    }
  },
  methods: {
    showPicker(selectPicker) {
      this.show = true;
      this.selectPicker = selectPicker;
      if(this.selectPicker == 'projectType') {
        return this.pickerList = this.list.projectType;
      }if(this.selectPicker == 'auditApproach') {
        return this.pickerList = this.list.auditApproach;
      }if(this.selectPicker == 'status') {
        if(this.form.auditApproach == '备案审计') {
          return this.pickerList = this.list.statusOne1;
        }else if(this.form.auditApproach == '直接审计') {
          return this.pickerList = this.list.statusOne2;
        }
      }if(this.selectPicker == 'status2') {
        if(this.form.status == '未提交审核报告') {
          return this.pickerList = this.list.statusTwo0;
        }else if(this.form.status == '已提交审核报告') {
          return this.pickerList = this.list.statusTwo1;
        }else if(this.form.status == '已反馈备案文书') {
          return this.pickerList = this.list.statusTwo2;
        }else if(this.form.status == '审计结果未定案') {
          return this.pickerList = this.list.statusTwo3;
        }else if(this.form.status == '审计结果已定案') {
          return this.pickerList = this.list.statusTwo4;
        }else if(this.form.status == '已出具征求意见书') {
          return this.pickerList = this.list.statusTwo5;
        }else if(this.form.status == '已归档') {
          return this.pickerList = this.list.statusTwo6;
        }else if(this.form.status == '') {
          return this.pickerList = this.list.statusTwo;
        }
      }if(this.selectPicker == 'chooseIntermediaryOrgan') {
        this.$api.auditSystem.getZJ()
        .then(res=>{
          var arr = [];
          res.intermediaryNameList.map(item => {
            arr = arr.concat(item.intermediaryName)
          })
          return this.pickerList = arr;
        })
      }
    },
    onCancel() {
      this.show = false;
      this.showTimePicker = false;
    },
    onConfirm(value,index) {
      this.show = false;
      if(this.selectPicker == 'projectType') {
        return this.form.projectType = value;
      }if(this.selectPicker == 'auditApproach') {
        this.showstatus = true;
        this.showstatus2 = false;
        this.form.status = this.form.status2 = '';
        return this.form.auditApproach = value;
      }if(this.selectPicker == 'status') {
        this.showstatus2 = true;
        this.form.status2 = '';
        return this.form.status = value;
      }if(this.selectPicker == 'status2') {
        return this.form.status2 = value;
      }if(this.selectPicker == 'chooseIntermediaryOrgan') {
        return this.form.chooseIntermediaryOrgan = value;
      }
    },
    auditSystemformatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return ''
      }
      return value;
    },
    confirmTime(value) {
      var values = value.toString();
      this.form.year = values.slice(11,15);
      this.showTimePicker = false;
    },
    replay() { //重置
      this.form.projectName = this.form.projectOwners = this.form.projectType = '';
      this.form.status = this.form.status2 = this.form.auditApproach = this.form.chooseIntermediaryOrgan = '';
      this.form.year = '';
      this.showstatus = this.showstatus2 = false;
    },
    sureForm() {
      this.$router.replace({ path: '/auditSystemIndex',query: { newData: this.form } })
    }
  },
}
</script>

<style lang="less" type="text/less">
@import '../../../assets/less/common.less';
//修改vant样式
.filterPage-wrap {
  .van-button {
    height: 100%;
  }
  .calendar {
    font-size: 50/@size;
    height: 80/@size;
    line-height: 80/@size;
  }
  .van-picker__cancel, .van-picker__confirm {
    color: #20b759;
  }
  .van-picker-column:nth-child(2) {
    display: none;
  }
}
</style>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.filterPage-wrap {
  padding-top: 80/@size;
  padding-bottom: 80/@size;
  .plateWrap {
    width: 100%;
    height: 100/@size;
    box-sizing: border-box;
    padding: 10/@size;
    border-bottom: 10/@size solid #f7f7f7; 
    span {
      display: inline-block;
      height: 80/@size;
      line-height: 80/@size;
      font-size: 20/@size;
      position: relative;
      b {
        color: #ff0000;
        font-size: 15/@size;
        position: absolute;
        top: -8/@size;
        right: -12/@size;
      }
      i {
        position: relative;
        top: 3/@size;
      }
    }
  }
  input {
    width: 400/@size;
    height: 80/@size;
    line-height: 80/@size;
    font-weight: 400;
    font-size: 20/@size;
    border: none;
    float: right;
    text-align: right;
  }
  .plateWrap span:nth-child(2){
    float: right;
    color: #6e6e6e;
    max-width: 350/@size;
    width: 300/@size;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .btnGroup {
    width: 100%;
    height: 80/@size;
    position: fixed;
    bottom: 0/@size;
    .btnWrap {
      float: left;
      height: 80/@size;
      width: 50%;
    }
  }
}
</style>