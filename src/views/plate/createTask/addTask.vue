<template>
  <div class="addTaskWrap">

    <!-- 表单头部信息栏 -->
    <div class="top-wrap" v-if="showFormWrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack"></van-icon>
      </span>
      <span class="route-title">任务拟办</span>
      <span class="setting-btn"></span>
    </div>

    <!-- 督办内容填写页面 -->
    <div class="top-wrap" v-if="showContentInput">
      <span @click="sure()" class="return-btn">
        <van-icon name="arrow-left"></van-icon>
      </span>
      <span class="route-title">督办内容</span>
      <span @click="sure()" class="setting-btn">
        <van-icon name="success"></van-icon>
      </span>
    </div>
    <div class="inputWrap" v-if="showContentInput">
      <textarea maxlength="200" v-model="form.supervisoryContent" @input="wordNumber('content')"></textarea>
      <span class="textAreaNumber">{{wordNumbers}}/200</span>
    </div>

    <!-- 备注填写页面 -->
    <div class="top-wrap" v-if="showMarkInput">
      <span @click="sure()" class="return-btn">
        <van-icon name="arrow-left"></van-icon>
      </span>
      <span class="route-title">备注</span>
      <span @click="sure()" class="setting-btn">
        <van-icon name="success"></van-icon>
      </span>
    </div>
    <div class="inputWrap" v-if="showMarkInput">
      <textarea v-model="remark" @input="wordNumber('content')"></textarea>
      <span class="textAreaNumber">{{wordNumbers}}/200</span>
    </div>

    <!-- 汇报周期页面 -->
    <div v-if="showCycle">
      <div class="top-wrap">
        <span @click="sureCycle()" class="return-btn">
        <van-icon name="arrow-left"></van-icon>
      </span>
        <span class="route-title">汇报周期</span>
        <span @click="sureCycle()" class="setting-btn">
          <van-icon name="success"></van-icon>
        </span>
      </div>
      <div class="cycWrap"></div>
      <div 
        class="cycleWrap"
        v-for="(item,index) in cycleContent"
        :key="index"
      >
        <div class="imgWrap">
          <img src="../../../../static/img/createTask/cycle.png" alt="">
        </div>
        <div class="textWrap">
          <span>{{index+1}}期任务</span>
          <span>{{item}}</span>
        </div>
        <div @click="deleteCycle(index)" class="deleteWrap"><van-icon name="close" /></div>
      </div>
      <div class="addCycleWrap">
        <div @click="openPop('cycleTime')" class="addCycle">
          <van-icon name="plus"></van-icon>
        </div>
      </div>
    </div>

    <!-- 文件依据页面 -->
    <div v-if="showFileBasis">
      <div class="top-wrap">
        <span class="return-btn">
          <van-icon @click="sureFileBasis()" name="arrow-left"></van-icon>
        </span>
        <span class="route-title">文件依据</span>
        <span class="setting-btn">
          <van-icon @click="checkUpFlie()" name="plus"></van-icon>
          <input 
            id="fileUpBtn" 
            type="file"  
            style="display: none;"
            @change="getFile($event)"
          >
        </span>
      </div>
      <div class="cycWrap"></div>
      <div class="descriptionWrap"
        v-for="(file, index) in files"
        :key="index"
      >
        <span class="imgWrap">
          <img 
            src="../../../assets/img/plate/createTask/doc.png" alt="doc"
            v-if="file.name.split('.')[1] == 'docx' || file.name.split('.')[1] == 'doc'"
          >
          <img 
            src="../../../assets/img/plate/createTask/xls.png" alt="xls"
            v-if="file.name.split('.')[1] == 'xlsx' || file.name.split('.')[1] == 'xls'"
          >
          <img 
            src="../../../assets/img/plate/createTask/pdf.png" alt="pdf"
            v-if="file.name.split('.')[1] == 'pdf'"
          >
          <img 
            src="../../../assets/img/plate/createTask/png.png" alt="png"
            v-if="file.name.split('.')[1] == 'png'"
          >
          <img 
            src="../../../assets/img/plate/createTask/jpg.png" alt="jpg"
            v-if="file.name.split('.')[1] == 'jpg'"
          >
          <img 
            src="../../../assets/img/plate/createTask/default.png" alt="default"
            v-else
          >
        </span>
        <span>{{file.name}}</span>
        <span class="deleteIcon">
          <van-icon name="close" @click="deleteFile(file,index)"></van-icon>
        </span>
      </div>
    </div>

    <!-- 表单部分 -->
    <div class="formWrap" v-if="showFormWrap">
      <div 
        class="plateWrap"
        style="display: flex;justify-content: space-between;"
      >
        <span><b>*</b>督办事项</span>
        <input type="text" maxlength='50' 
          placeholder="请输入督办事项名称，最多输入50个字符."
          v-model="form.supervisoryItems"
        >
      </div>
      <div class="groupWrap">
        <div class="plateWrap">
          <span><b>*</b>开始时间</span>
          <span @click="openPop('startTime')">{{form.startTime == '' ? '请选择' : form.startTime}}<van-icon name="arrow" /></span>
        </div>
        <div class="plateWrap">
          <span><b>*</b>截止时间</span>
          <span @click="openPop('endTime')">{{form.endTime == '' ? '请选择' : form.endTime}}<van-icon name="arrow" /></span>
        </div>
      </div>
      <div class="groupWrap">
        <div @click="goInput('content')" class="plateWrap">
          <span><b>*</b>督办内容</span>
          <span>{{form.supervisoryContent == '' ? '请填写内容' : form.supervisoryContent}}<van-icon name="arrow" /></span>
        </div>
      </div>
      <div class="groupWrap">
        <div @click="openPop('source')" class="plateWrap">
          <span><b>*</b>任务来源</span>
          <span>{{form.source == '' ? '请选择' : form.source}}<van-icon name="arrow" /></span>
        </div>
        <div @click="goInput('cycle')" class="plateWrap">
          <span><b>*</b>汇报周期</span>
          <span>{{form.reportingPeriod == '' ? '请选择' : form.reportingPeriod}}<van-icon name="arrow" /></span>
        </div>
        <div @click="openPop('remind')" class="plateWrap">
          <span><b>*</b>汇报提醒</span>
          <span>{{form.templateId == '' ? '请选择' : '已选择'}}<van-icon name="arrow" /></span>
        </div>
      </div>
      <div class="groupWrap">
        <div @click="openPop('takeLead')" class="plateWrap">
          <span><b>*</b>牵头负责人</span>
          <span>{{form.takeleadStaffId == '' ? '请选择' : form.takeleadStaff}}<van-icon name="arrow" /></span>
        </div>
        <div @click="openPop('coordination')" class="plateWrap">
          <span>配合处室负责人</span>
          <span>{{responsibilityStaff == '' ? '请选择' : responsibilityStaff}}<van-icon name="arrow" /></span>
        </div>
        <div @click="openPop('leader')" class="plateWrap">
          <span><b>*</b>分管领导</span>
          <span>{{form.leading == '' ? '请选择' : form.leading}}<van-icon name="arrow" /></span>
        </div>
        <div v-if="approverPermissions == 'true'" @click="openPop('approval')" class="plateWrap">
          <span><b>*</b>督办任务审批人</span>
          <span>{{form.approverId == '' ? '请选择' : approvalText}}<van-icon name="arrow" /></span>
        </div>
      </div>
      <div class="groupWrap">
        <div @click="goInput('mark')" class="plateWrap">
          <span>备注</span>
          <span>{{remark == '' ? '请填写备注' : remark}}<van-icon name="arrow" /></span>
        </div>
      </div>
      <div class="groupWrap">
        <div class="btnWrap">
          <van-button @click="submitMission()" type="primary" size="large">提交</van-button>
        </div>
      </div>
    </div>
    
    <!-- pop弹出层 -->
    <van-popup v-model="show" position="bottom">

      <!-- 开始时间 -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="timePickerCancel"
        @confirm="startTimePickerConfirm"
        v-if="popContent == 'startTime'"
      />
      <!-- 结束时间 -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="timePickerCancel"
        @confirm="endTimePickerConfirm"
        v-if="popContent == 'endTime'"
      />
      <!-- 任务来源 -->
      <div v-if="popContent == 'source'">
        <div class="popTitle">
          <van-icon @click="timePickerCancel()" name="cross" />
          <span>任务来源</span>
          <van-icon @click="sureSource()" name="success" />
        </div>
        <van-checkbox-group v-model="sourceResult">
          <van-checkbox
            v-for="(item, index) in sourceList"
            :key="index"
            :name="item"
            checked-color="#20b759"
          >
            {{ item }}
          </van-checkbox>
        </van-checkbox-group>
          <van-checkbox 
            :label-disabled="labelDisabled" 
            v-model="zidingyiresult" 
            :name="zidingyi" 
            checked-color="#20b759" 
          >
            <span style="margin-right: 30px">自定义</span>
            <input type="text" maxlength="12" v-model="zidingyi" placeholder="请输入任务来源">
          </van-checkbox>
      </div>
      <!-- 汇报提醒 -->
      <van-picker
        show-toolbar
        title="汇报提醒模板"
        :columns="remindColumns"
        @cancel="timePickerCancel"
        @confirm="sureRemind"
        v-if="popContent == 'remind'"
      />
      <!-- 牵头负责人 -->
      <van-picker
        show-toolbar
        title="牵头负责人"
        :columns="takeLeadColumns"
        @cancel="timePickerCancel"
        @confirm="sureTakeLead"
        v-if="popContent == 'takeLead'"
      />
      <!-- 配合处室负责人 -->
      <div v-if="popContent == 'coordination'">
        <div class="popTitle">
          <van-icon @click="timePickerCancel()" name="cross" />
          <span>配合处室负责人</span>
          <van-icon @click="sureCoordination()" name="success" />
        </div>
        <van-checkbox-group v-model="coordinationResult">
          <van-checkbox
            v-for="(item, index) in coordinationColumns"
            :key="index"
            :name="item"
            checked-color="#20b759"
          >
            {{ item.userName }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <!-- 分管领导 -->
      <div v-if="popContent == 'leader'">
        <div class="popTitle">
          <van-icon @click="timePickerCancel()" name="cross" />
          <span>分管领导</span>
          <van-icon @click="sureLeader()" name="success" />
        </div>
        <van-checkbox-group v-model="leaderResult">
          <van-checkbox
            v-for="(item, index) in leaderColumns"
            :key="index"
            :name="item"
            checked-color="#20b759"
          >
            {{ item.userName }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <!-- 督办任务审批人 -->
      <van-picker
        show-toolbar
        title="督办任务审批人"
        :columns="approvalColumns"
        @cancel="timePickerCancel"
        @confirm="sureApproval"
        :formatter="formatter"
        v-if="popContent == 'approval'"
      />
      <!-- 开始时间 -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="timePickerCancel"
        @confirm="cyclePickerConfirm"
        :formatter="formatter"
        v-if="popContent == 'cycleTime'"
      />
    </van-popup>
  </div>
</template>

<script>
import * as $api from '@/api';
import { Toast, Dialog } from 'vant';
import aes from '../../../utils/aes';
import axios from '@/utils/http'; // 导入http中创建的axios实例
import base from '@/api/base'; // 导入接口域名列表
export default {
  data() {
    return {
      sourceList: ['目标任务', '领导批示', '临时交办', '会议纪要', '党工委安排', '上级纪委安排'], //任务来源
      sourceResult: [], //任务来源的结果集
      coordinationResult: [], 
      leaderResult: [], 
      leaderColumns: [],

      approverPermissions: '', // 任务审批人权限

      newMission: true, // 判断是否是初次创建的任务

      labelDisabled: true,
      currentDate: new Date(), // 时间选择器初始值
      minDate: new Date(2000,0,1), // 时间选择器最小值
      show: false, // pop显示
      showFormWrap: true,
      showContentInput: false,
      showMarkInput: false,
      showFileBasis: false,
      showCycle: false,
      contentInfo: '',
      remarkInfo: '',
      wordNumbers: '0',
      zidingyiresult: false,
      zidingyi: '',

      popContent: '', // pop显示内容
      resetDate: '', // 时间选择器选择之后过滤掉的时间
      remindColumns: [], // 汇报提醒选择器中展示的数组
      remindText: '',  // 汇报提醒选中后展示的字段
      takeLeadColumns: [], // 牵头负责人选择器中展示的数组
      takeLeadText: '', // 牵头负责人选中后展示的字段
      coordinationColumns: [], //配合处室负责人选择器中展示的数组
      approvalColumns: [],
      approvalText: '',
      cycleContent: [],

      files: [], //文件依据列表
      missionId: '', //任务生成后返回的任务id

      // 非必填项
      responsibilityStaff: '', //配合处室负责人名称
      responsibilityStaffId: '', //配合处室负责人id
      responsibilitySectionName: '', //配合处室名称
      responsibilitySectionId: '', //配合处室id
      remark: '', //备注

      form: { // 表单提交的数据
        supervisoryItems: '', //督办事项
        startTime: '', //开始时间
        endTime: '', //截止时间
        supervisoryContent: '',//督查内容
        source: '', //任务来源
        reportingPeriod: '', //汇报周期
        templateId: '', //汇报提醒模板id
        takeleadStaff: '', //牵头处室负责人名字
        takeleadStaffId: '', //牵头处室负责人id
        takeleadSectionName: '', //牵头处室名称
        takeleadSectionId: '', //牵头处室id
        leading: '', //分管领导名称
        leadingId: '', //分管领导id
        approverId: '', //督办任务审批人id
      }

    }
  },
  methods: {
    routerBack() {
      this.$router.back(-1)
    },
    openPop(item) { //开启pop 根据传参改变pop内容
      this.show = true;
      this.popContent = item;
      if(item == 'remind') {
        this.$api.createTask.getRemindTemplete()
        .then(res=>{
          if(!res.result.length == this.remindColumns.length){
            for(item of res.result) {
              this.remindColumns.push(item.templateName)
            }
          }
          return 
        })
      }else if(item == 'takeLead') {
        this.$api.createTask.getTakeLead()
        .then(res=> {
          if(!res.users.length == this.takeLeadColumns.length){
            for(item of res.users) {
              this.takeLeadColumns.push(item.userName)
            }
          }
          return 
        })
      }else if(item == 'coordination') {
        this.$api.createTask.getCoordination()
        .then(res=>{
          this.coordinationColumns = res.users;
        })
      }else if(item == 'leader') {
        this.$api.createTask.getLeader()
        .then(res=>{
          this.leaderColumns = res.users;
        })
      }else if(item == 'approval') {
        this.$api.createTask.getApproval()
        .then(res=>{
          if(!res.users.length == this.approvalColumns.length){
            for(item of res.users) {
              this.approvalColumns.push(item.userName)
            }
          }
          return 
        })
      }
    },
    timePickerCancel() { //关闭pop
      this.show = false;
      this.currentDate = new Date();
    },
    filterDate() { //将时间重新转换
      var date = this.currentDate;
      var seperator1 = "-";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.resetDate = 
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate
    },
    formatter(type,value) {
      return value;
    },
    startTimePickerConfirm() { //确认开始时间
      this.filterDate();
      this.show = false;
      this.form.startTime = this.resetDate;
    },
    endTimePickerConfirm() { //确认截止时间
      this.filterDate();
      this.show = false;
      this.form.endTime = this.resetDate;
    },
    goInput(where) { //跳转督办内容或备注
      this.showFormWrap = false;
      if(where == 'content') {
        this.showContentInput = true;
      }else if(where == 'mark'){
        this.showMarkInput = true;
      }else if(where == 'cycle'){
        this.showCycle = true;
      }else if(where == 'fileBasis'){
        this.showFileBasis = true;
      }
      this.wordNumber(where);
    },
    sure() { //确认督办内容和备注
      this.showContentInput = false;
      this.showMarkInput = false;
      this.showFormWrap = true;
    },
    sureSource() { //确认任务来源
      this.form.source = '';
      this.form.source = this.sourceResult.join(',');
      if(this.zidingyiresult == true) {
        if(this.zidingyi == '') {
          Toast.fail('请输入自定义来源');
          return;
        }else {
          if(this.form.source == '') {
            this.form.source = this.zidingyi;
          }else {
            this.form.source = this.form.source + ',' + this.zidingyi;
          }
        }
      }
      this.show = false;
    },
    sureRemind(value, index) { //确认汇报提醒模板
      this.$api.createTask.getRemindTemplete()
        .then(res=>{
          this.form.templateId = res.result[index].id;
          this.remindText = res.result[index].templateName;
          this.show = false;
        })
    },
    sureTakeLead(value,index) { //确认牵头负责人
      this.$api.createTask.getTakeLead()
        .then(res=>{
          this.form.takeleadStaff = res.users[index].userName;
          this.form.takeleadStaffId = res.users[index].id;
          this.form.takeleadSectionName = res.users[index].deptName;
          this.form.takeleadSectionId = res.users[index].deptid;
          this.takeLeadText = res.users[index].userName;
          this.show = false;
        })
    },
    sureCoordination() {
      this.responsibilityStaffId = this.responsibilityStaff = this.responsibilitySectionName = this.responsibilitySectionId = '';
      this.responsibilityStaffId = this.coordinationResult.map(item => item.id).join(',')
      this.responsibilityStaff = this.coordinationResult.map(item => item.userName).join(',')
      this.responsibilitySectionName = this.coordinationResult.map(item => item.deptName).join(',')
      this.responsibilitySectionId = this.coordinationResult.map(item => item.deptid).join(',')
      this.coordinationResult = [];
      this.show = false;
    },
    sureLeader() {
      this.form.leading = this.form.leadingId = '';
      this.form.leading = this.leaderResult.map(item => item.userName).join(',');
      this.form.leadingId = this.leaderResult.map(item => item.id).join(',');
      this.leaderResult = [];
      this.show = false;
    },
    sureApproval(value,index) {
      this.$api.createTask.getApproval()
      .then(res=>{
        this.form.approverId = res.users[index].id;
        this.approvalText = res.users[index].userName;
        this.show = false;
      })
    },
    sureFileBasis() { //文件依据返回操作
      Dialog.confirm({
        title: '提示',
        message: '确定退出文件上传页面吗？',
        confirmButtonColor: '#02ac61',
        cancelButtonColor: '#02ac61',
      }).then(() => {
        this.$router.back(-1)
      }).catch(() => {
        
      });
    },
    checkUpFlie() { //点击添加文件按钮
      document.getElementById("fileUpBtn").click();
    },
    getFile(event) { //确认文件后的操作
      var formData = new FormData()
      formData.append('files', event.target.files[0])
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      },
      id = this.missionId;
      axios.post(`${base.baseUrl}/app/dbrw/${id}/fileUpload`,formData,config)
      .then(res=>{
        if(res.code == '200') {
          Toast('添加成功！')
          this.files.push(event.target.files[0]);
          this.files[this.files.length - 1]['id'] = res.fileId
        }
      })
    },
    deleteFile(file,index) { //文件依据删除按钮
      this.$api.createTask.deleteFile(file.id)
      .then(res => {
        if(res.code == '200') {
          this.files.splice(index,1)
          Toast('删除成功！')
        }else { return }
      })
    },
    
    wordNumber(from) {
      if(from == 'content'){ this.wordNumbers = this.form.supervisoryContent.length }
        else { this.wordNumbers = this.remarkInfo.length }
    },
    submitMission() { //表单提交
      for(var item in this.form) {
        if(this.form[item] == '') {
          Toast('请填写必填项！')
          console.log(item)
          return
        }
      }
      if(this.responsibilityStaff != '') {
        this.form.responsibilityStaffId = this.responsibilityStaffId;
        this.form.responsibilityStaff = this.responsibilityStaff;
        this.form.responsibilitySectionName = this.responsibilitySectionName;
        this.form.responsibilitySectionId = this.responsibilitySectionId;
      }
      if(this.remark != '') {
        this.form.remark = this.remark;
      }
      var info = aes.encrypt(JSON.stringify(this.form)),
        _this = this;
      let data = `"requestData": "${info}"`
      if(this.newMission) { // 如果是初次提交
        this.$api.createTask.submitMission(data)
          .then(res=>{
            if(res.code == '200') {
              this.missionId = res.id;
              Dialog.confirm({
                title: '提示',
                message: '任务创建成功，是否为该任务上传相关文件？',
                confirmButtonColor: '#02ac61',
                cancelButtonColor: '#02ac61',
              }).then(() => {
                this.goInput('fileBasis');
              }).catch(() => {
                Toast('任务创建成功！')
                window.setTimeout(() => {
                  this.$router.back(-1)
                },500)
              });
            }else {
              return false;
            }
          })
      }else { // 再次提交
        var id = this.$route.query.id;
        this.$api.createTask.submitMissionAgain(id,data)
        .then(res=>{
          if(res.code == '200') {
            this.missionId = id;
            Dialog.confirm({
              title: '提示',
              message: '任务创建成功，是否为该任务上传相关文件？',
              confirmButtonColor: '#02ac61',
              cancelButtonColor: '#02ac61',
            }).then(() => {
              this.goInput('fileBasis');
            }).catch(() => {
              Toast('任务创建成功！')
              window.setTimeout(() => {
                this.$router.back(-1)
              },500)
            });
          }else {
            return false;
          }
        })
      }
    },
    sureCycle() { // 确认提交汇报周期
      this.form.reportingPeriod = this.cycleContent.join(',');
      this.showContentInput = false;
      this.showMarkInput = false;
      this.showCycle = false;
      this.showFormWrap = true;
    },
    cyclePickerConfirm() {
      this.filterDate()
      this.cycleContent.push(this.resetDate)
      this.show = false;
    },
    deleteCycle(index) { //删除汇报周期
      this.cycleContent.splice(index,1)
    }
  },
  created() {
    localStorage.setItem('isAddMission','true')
  },
  mounted() {
    this.$api.createTask.getAddPower()
    .then(res=> {
      this.approverPermissions = res.approverPermissions;
      if(this.approverPermissions == 'false') {
        delete this.form.approverId
      }
    })
    if( this.$route.query.item == undefined ) {
      return false
    }else {
      var item = this.$route.query.item;
      console.log(item,this.$route.query.id)
      if(item.responsibilityStaffId == '') {
        delete item.responsibilityStaffId;
        delete item.responsibilityStaff;
        delete item.responsibilitySectionName;
        delete item.responsibilitySectionId;
      }else {
        this.responsibilityStaffId = item.responsibilityStaffId;
        this.responsibilityStaff = item.responsibilityStaff;
        this.responsibilitySectionName = item.responsibilitySectionName;
        this.responsibilitySectionId = item.responsibilitySectionId;
      }
      if(item.taskFileData == '') {
        delete item.taskFileData
      }
      this.newMission = false;
      this.approvalText = item.approver;
      this.mark = item.mark;
      // delete item.remark;
      // delete item.approver
      delete item.time
      delete item.code
      delete item.msg
      delete item.reportTemplet
      delete item.taskAudit
      delete item.attachments
      this.form = item;
    }
  },
  beforeDestroy() {
    localStorage.setItem('isAddMission','false')
  }
}
</script>

<style lang="less" type="text/less">
@import '../../../assets/less/common.less';
.addTaskWrap {
  .van-picker__cancel, .van-picker__confirm {
    color: #20b759;
  }
  .van-checkbox-group {
    overflow-y: auto;
    max-height: 700/@size;
  }
  .van-checkbox {
    height: 80/@size;
    font-size: 20/@size;
    box-sizing: border-box;
    padding-left: 10/@size;
    border-bottom: 1/@size solid #e5e5e5;
    input {
      border: none;
      height: 80/@size;
      width: 300/@size;
    }
  }
  .popTitle {
    width: 100%;
    height: 80/@size;
    display: flex;
    font-size: 24/@size;
    line-height: 80/@size;
    box-sizing: border-box;
    padding: 0 10/@size;
    border-bottom: 1/@size solid #bfbfbf;
    span {
      flex: 1;
      text-align: center;
    }
    i {
      line-height: 80/@size;
      color: #20b759;
      font-size: 34/@size;
    }
  }
}
</style>
<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.addTaskWrap {
  width: 100%;
  min-height: 100%;
  background-color: #f7f7f7;
  // 对顶部导航条进行样式修改
  .top-wrap {
    position: fixed;
    width: 100%;
    height: 80/@size;
    background-color: white;
    color: #323232;
    font-size: 18/@size;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20/@size;
    z-index: 9999;
    .return-btn {
      font-size: 28/@size;
      width: 150/@size;
      i {
        position: relative;
        top: 5/@size;
      }
      .text {
        position: relative;
        left: -10/@size;
      }
    }
    .route-title {
      font-size: 32/@size;
      text-align: center;
    }
    .setting-btn {
      font-size: 34/@size;
      width: 150/@size;
      text-align: right;
      position: relative;
      top: 5/@size;
      a {
        color: white;
      }
    }
  }
  .inputWrap {
    width: 100%;
    height: 400/@size;
    padding: 0 5/@size;
    box-sizing: border-box;
    padding-top: 80/@size;
    textarea {
      width: 100%;
      height: 350/@size;
      border: none;
      border-bottom: 1/@size solid #bfbfbf;
      font-size: 22/@size;
      color: #000;
      box-sizing: border-box;
      padding: 20/@size 5/@size;
    }
    .textAreaNumber {
      text-align: right;
      display: inline-block;
      font-size: 16/@size;
      width: 100%;
      height: 48/@size;
      line-height: 48/@size;
    }
  }
  .cycWrap { padding-top: 80/@size; }
  .cycleWrap {
    background-color: #fff;
    box-sizing: border-box;
    height: 80/@size;
    width: 100%;
    padding: 0 10/@size;
    display: flex;
    border-bottom: 1px solid #dcdcdc;
    .imgWrap {
      width: 100/@size;height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50/@size;height: 45/@size;
      }
    }
    .textWrap {
      flex: 1;
      span {
        display: inline-block;
        width: 48%;
        height: 80/@size;
        line-height: 80/@size;
        text-align: left;
      }
      span:nth-child(2) {
        text-align: right;
      }
    }
    .deleteWrap {
      width: 50/@size;height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ccc;
      font-size: 30/@size;
    }
  }
  .addCycleWrap {
    width: 100%;
    height: 200/@size;
    display: flex;
    justify-content: center;
    align-items: center;
    .addCycle {
      width: 80/@size;
      height: 80/@size;
      background-color: #e5e5e5;
      text-align: center;
      i {
        color: #bbb;
        font-size: 30/@size;
        margin-top: 50%;
        position: relative;
        top: -15/@size;
      }
    }
  }
  .formWrap {
    padding-top: 80/@size;
    .plateWrap {
      width: 100%;
      height: 80/@size;
      background-color: #fff;
      box-sizing: border-box;
      padding: 0 10/@size;
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
    .groupWrap {
      margin-top: 20/@size;
      .plateWrap {
        border-bottom: 1px solid #e5e5e5;
      }
      .btnWrap {
        float: left;
        width: 100%;
      }
    }
    .groupWrap .plateWrap:last-child {
      border-bottom: none;
    }
  }
  .descriptionWrap {
    width: 100%;
    height: 100/@size;
    box-sizing: border-box;
    padding: 0 20/@size 0 40/@size;
    border-bottom: 1/@size solid #dcdcdc;
    span {
      display: inline-block;
      width: 370/@size;
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
    .deleteIcon {
      width: 50/@size;
      text-align: center;
      line-height: 0/@size;
      font-size: 40/@size;
      color: #ccc;
      i {
        position: relative;
        top: 50/@size;
        margin-top: -20/@size;
      }
    }
  }
}
</style>