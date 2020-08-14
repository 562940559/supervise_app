import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
Vue.use(Router);

// path 路由地址
// name 路由名称
// component 引入的组件路径
// keepAlive 在vue.app中所做的是否缓存判读
// requireAuth 需要登录才能访问的页面
// showTop 该路由下是否显示top
// showBack top中是否显示回退按钮
// title top中的页面标题
// active 对应tabbar中的位置
// showSearch 是否显示Search按钮 true不显示 false显示

export const router = [{
    path: '/',
    name: '工作页面',
    component: () => import('../views/index/index'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '工作',
      showTab: true,
      active: 1,
      showAdd: false,
      showSearch: false
    }
  },{
    path: '/chatIndex',
    name: '消息页面',
    component: () => import('../views/chat/index'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '消息',
      showTab: true,
      active: 0,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/chatDetail',
    name: '消息详情',
    component: () => import('../views/chat/chatDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '消息',
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/needToDo',
    name: '待办页面',
    component: () => import('../views/needToDo/index'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '我的待办',
      showTab: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/mailList',
    name: '通讯录页面',
    component: () => import('../views/mailList/index'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      showTop: false,
      title: '通讯录',
      showTab: true,
      active: 2,
    }
  },{
    path: '/departmentDetail',
    name: '部门人员列表',
    component: () => import('../views/mailList/departmentDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      showSearch: false,
      showBack: true
    }
  },{
    path: '/businessCard',
    name: '个人资料',
    component: () => import('../views/mailList/businessCard.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      showSearch: true,
      showAdd: true,
      showBack: true,
      title: '个人资料',
      showHome: true
    }
  },{
    path: '/moreNotice',
    name: '公告列表',
    component: () => import('../views/index/moreNotice.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '公告',
      showBack: true
    }
  },{
    path: '/noticeDetail',
    name: '公告详情',
    component: () => import('../views/index/noticeDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '公告',
      showBack: true,
      showAdd: true,
      showSearch: true,
      showHome: true
    }
  },{
    path: '/mine',
    name: '我的',
    component: () => import('../views/mine/index'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '我的',
      showTab: true,
      active: 3,
      showAdd: true,
      showSearch: true
    }
  },{
    path: '/setting',
    name: '设置',
    component: () => import('../views/mine/setting.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '设置',
      showAdd: true,
      showSearch: true,
      showBack: true,
    }
  },{
    path: '/about',
    name: '关于',
    component: () => import('../views/mine/about.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '关于',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/refreshPage',
    name: '刷新跳转页面',
    component: () => import('../views/refresh.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '刷新',
    }
  },{
    path: '/createTask',
    name: '任务拟办首页',
    component: () => import('../views/plate/createTask'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '流程管理',
      showAdd: true,
      showSearch: true,
      showBack: true
    }
  },{
    path: '/completedDetail',
    name: '已拟办任务',
    component: () => import('../views/plate/createTask/completedDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '已拟办任务',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/fileBasis',
    name: '文件依据（id查询）',
    component: () => import('../views/plate/createTask/fileBasis.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '文件依据',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/examineDetail',
    name: '审核详情（借口访问）',
    component: () => import('../views/plate/createTask/examineDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '审核详情',
      showBack: true,
      showAdd: true,
      showSearch: true,
      showHome: true
    }
  },{
    path: '/addTask',
    name: '任务拟办页面',
    component: () => import('../views/plate/createTask/addTask.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '任务拟办',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/mineMission',
    name: '我的任务（审核）',
    component: () => import('../views/plate/mineMission'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '我的任务',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/mineMission_hb',
    name: '我的任务(汇报)',
    component: () => import('../views/plate/mineMission/mineMission_hb.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '我的任务',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/mineMission_fp',
    name: '我的任务(分配)',
    component: () => import('../views/plate/mineMission/mineMission_fp.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '我的任务',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/mineMission_gd',
    name: '我的任务(归档)',
    component: () => import('../views/plate/mineMission/mineMission_gd.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '我的任务',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/missionDetail',
    name: '任务详情',
    component: () => import('../views/plate/mineMission/missionDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '任务详情',
      showBack: true,
      showAdd: true,
      showSearch: true,
      showHome: true
    }
  },{
    path: '/processingProcess',
    name: '办理流程',
    component: () => import('../views/plate/mineMission/processingProcess.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '办理流程',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/leadingReport',
    name: '牵头汇报',
    component: () => import('../views/plate/mineMission/leadingReport.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '牵头汇报',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/leadingReportDetail',
    name: '牵头汇报详情',
    component: () => import('../views/plate/mineMission/leadingReportDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '牵头汇报详情',
      showBack: true,
      showAdd: true,
      showSearch: true,
      showHome: true
    }
  },{
    path: '/coordinationReport',
    name: '配合汇报',
    component: () => import('../views/plate/mineMission/coordinationReport.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '配合汇报',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/coordinationReportDetail',
    name: '配合汇报详情',
    component: () => import('../views/plate/mineMission/coordinationReportDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '配合汇报详情',
      showBack: true,
      showAdd: true,
      showSearch: true,
      showHome: true
    }
  },{
    path: '/handleReport',
    name: '办理汇报',
    component: () => import('../views/plate/mineMission/handleReport.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '办理汇报',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/handleReportDetail',
    name: '办理汇报详情',
    component: () => import('../views/plate/mineMission/handleReportDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '办理汇报详情',
      showBack: true,
      showAdd: true,
      showSearch: true,
      showHome: true
    }
  },{
    path: '/statuteQuery',
    name: '知识库查询',
    component: () => import('../views/plate/statuteQuery'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '知识库查询',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/approval',
    name: '审批',
    component: () => import('../views/plate/approval'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '审批',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/pendingApprovalDetail',
    name: '待审批',
    component: () => import('../views/plate/approval/pendingApprovalDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '待审核任务',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/approvedDetail',
    name: '已审批',
    component: () => import('../views/plate/approval/approvedDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '已审核任务',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/seeAuditDetails',
    name: '审核详情（item传输）',
    component: () => import('../views/plate/approval/auditDetails.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '审核详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/seeFileBasis',
    name: '文件依据（item传输）',
    component: () => import('../views/plate/approval/fileBasis.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '文件依据',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/seeEnclosure',
    name: '附件',
    component: () => import('../views/plate/approval/enclosure.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '附件',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/seeCycle',
    name: '汇报周期',
    component: () => import('../views/plate/approval/cycle.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '汇报周期',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/statistics',
    name: '督办统计',
    component: () => import('../views/plate/statistics'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '任务统计',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/statisticsSecond',
    name: '督办统计二级',
    component: () => import('../views/plate/statistics/statisticsSecond'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '任务统计',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/statisticsDetail',
    name: '督办统计详情',
    component: () => import('../views/plate/statistics/statisticsDetail'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '任务统计',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/takeLeadMission',
    name: '牵头任务首页',
    component: () => import('../views/plate/takeLeadMission'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '牵头任务',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/takeLeadReportList',
    name: '牵头汇报情况列表',
    component: () => import('../views/plate/takeLeadMission/reportList.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '查看汇报情况',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/takeLeadReport',
    name: '牵头汇报1',
    component: () => import('../views/plate/takeLeadMission/report.vue'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      keepAlive: true,
      showTop: true,
      title: '汇报',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/takeLeadReportDetail',
    name: '牵头汇报详情（不可修改）',
    component: () => import('../views/plate/takeLeadMission/reportDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '汇报详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/undertakeMission',
    name: '承办任务首页',
    component: () => import('../views/plate/undertakeMission'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '承办任务',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/undertakeReport',
    name: '承办汇报',
    component: () => import('../views/plate/undertakeMission/report.vue'),
    meta: {
      requireAuth: true,
      keepAlive: true,
      showTop: true,
      title: '汇报',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/undertakeReportDetail',
    name: '承办汇报详情（不可修改）',
    component: () => import('../views/plate/undertakeMission/reportDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '汇报详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/coordinateMission',
    name: '配合任务首页',
    component: () => import('../views/plate/coordinationMission'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '配合任务',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/coordinateReport',
    name: '配合汇报1',
    component: () => import('../views/plate/coordinationMission/report.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      keepAlive: true,
      title: '汇报',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/coordinateReportDetail',
    name: '配合汇报详情（不可修改）',
    component: () => import('../views/plate/coordinationMission/reportDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '汇报详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/missionDistribution',
    name: '任务分配首页',
    component: () => import('../views/plate/missionDistribution'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '任务分配',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/missionDistributionDetail',
    name: '任务分配详情',
    component: () => import('../views/plate/missionDistribution/missionDistributionDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '分配详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/fileMission',
    name: '任务归档首页',
    component: () => import('../views/plate/fileMission'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '任务归档',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/fileMissionDetail',
    name: '任务归档详情（归档）页面',
    component: () => import('../views/plate/fileMission/fileMissionDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '任务详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/fileMissionExamine',
    name: '任务归档审核详情页面',
    component: () => import('../views/plate/fileMission/examine.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '审核详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/queryDetail',
    name: '知识库查询详情',
    component: () => import('../views/plate/statuteQuery/queryDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '知识库详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/zprwNiBan',
    name: '指派任务拟办首页',
    component: () => import('../views/plate/zprwCreateTask'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '指派任务',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/addZprwNiBan',
    name: '新增指派任务',
    component: () => import('../views/plate/zprwCreateTask/addZprw.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '新增指派',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/zprwCompletedDetail',
    name: '已完成指派任务详情',
    component: () => import('../views/plate/zprwCreateTask/zprwCompleteDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '任务详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/zprwReportIndex',
    name: '指派任务汇报首页',
    component: () => import('../views/plate/zprwReport'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '指派任务汇报',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/zprwReport',
    name: '指派任务汇报',
    component: () => import('../views/plate/zprwReport/report.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      keepAlive: true,
      title: '任务详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/zprwReportDetail',
    name: '指派任务汇报详情',
    component: () => import('../views/plate/zprwReport/reportDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '任务详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/zprwApproval',
    name: '指派任务审核首页',
    component: () => import('../views/plate/zprwApproval'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '指派任务',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/zprwPendingApprovalDetail',
    name: '指派任务待审核页面',
    component: () => import('../views/plate/zprwApproval/zprwPendingApprovalDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '任务详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/zprwApprovedDetail',
    name: '指派任务已审核页面',
    component: () => import('../views/plate/zprwApproval/zprwApprovedDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '任务详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/zprwFileMissionIndex',
    name: '指派任务归档首页',
    component: () => import('../views/plate/zprwFileMission'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '指派任务归档',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/zprwFileMissionDetail',
    name: '指派任务归档操作页面',
    component: () => import('../views/plate/zprwFileMission/zprwFileMissionDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '任务详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/zprwStatistics',
    name: '指派任务数据',
    component: () => import('../views/plate/zprwStatistics'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '指派统计',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/zprwStatisticsSecond',
    name: '指派任务数据二级页面',
    component: () => import('../views/plate/zprwStatistics/statisticsSecond.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '指派统计',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/zprwStatisticsDetail',
    name: '指派任务数据详情',
    component: () => import('../views/plate/zprwStatistics/statisticsDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '指派统计',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/auditSystemIndex',
    name: '审计项目查询首页',
    component: () => import('../views/plate/auditSystem'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '审计项目查询',
      showBack: true,
      keepAlive: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/auditSystemFilter',
    name: '审计项目筛选页面',
    component: () => import('../views/plate/auditSystem/filterPage.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      keepAlive: true,
      title: '审计项目查询',
      showBack: true,
      showAdd: true,
      showSearch: true,
    }
  },{
    path: '/auditSystemDetail',
    name: '审计项目详情页面',
    component: () => import('../views/plate/auditSystem/details.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '项目详情',
      showBack: true,
      showAdd: true,
      showSearch: true,showHome: true
    }
  },{
    path: '/auditDataGather',
    name: '审计项目数据集页面',
    component: () => import('../views/plate/auditSystem/dataGather.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '审核详情',
      showBack: true,
      showAdd: true,
      showSearch: true
    }
  },{
    path: '/auditFile',
    name: '审计项目文件下载页面',
    component: () => import('../views/plate/auditSystem/auditFile.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '相关文件',
      showBack: true,
      showAdd: true,
      showSearch: true
    }
  },{
    path: '/historyMission',
    name: '历史任务',
    component: () => import('../views/index/historyMission_ing.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '我的任务',
      showBack: true,
      showAdd: true,
      showSearch: true
    }
  },{
    path: '/historyMission_done',
    name: '历史任务（已完成）',
    component: () => import('../views/index/historyMission_done.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      title: '我的任务',
      showBack: true,
      showAdd: true,
      showSearch: true
    }
  },{
    path: '/historyMissionDetail',
    name: '历史任务（详情）',
    component: () => import('../views/index/historyMissionDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      title: '任务详情',
      showBack: true,
      showAdd: true,
      showSearch: true,
      showHome: true,
      showHome: true
    }
  },{
    path: '/searchMission',
    name: '搜索任务',
    component: () => import('../views/index/searchMission.vue'),
    meta: {
      keepAlive: true,
      requireAuth: true,
      showTop: true,
      title: '搜索任务',
      showBack: true,
      showAdd: true,
      showSearch: true
    }
  },{
    path: '/searchMail',
    name: '搜索通讯录',
    component: () => import('../views/index/searchMail.vue'),
    meta: {
      keepAlive: true,
      requireAuth: true,
      showTop: true,
      title: '搜索',
      showBack: true,
      showAdd: true,
      showSearch: true
    }
  },{
    path: '/seeReportList',
    name: '汇报列表',
    component: () => import('../views/plate/zprwFileMission/reportList.vue'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      showTop: true,
      title: '汇报列表',
      showBack: true,
      showAdd: true,
      showSearch: true,
      showHome: true
    }
  },{
    path: '/groupChatList',
    name: '群聊列表',
    component: () => import('../views/mailList/groupChatList.vue'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      showTop: false,
      title: '群聊',
      showAdd: true,
      showSearch: true,
      showHome: true
    }
  },{
    path: '/addGroupChat',
    name: '创建群聊',
    component: () => import('../views/chat/addGroupChat.vue'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      showTop: false,
      title: '创建群聊',
      showAdd: true,
      showSearch: true,
      showHome: true
    }
  },{
    path: '/groupChatDetail',
    name: '群聊详情',
    component: () => import('../views/chat/groupChatDetail.vue'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      showTop: false,
      title: '群聊',
      showAdd: true,
      showSearch: true,
      showHome: true
    }
  },{
    path: '/groupChatSetting',
    name: '群聊设置',
    component: () => import('../views/chat/groupChatSetting.vue'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      showTop: false,
      title: '群聊设置',
      showAdd: true,
      showSearch: true,
      showHome: true
    }
  },{
    path: '/setGroupChatName',
    name: '设置群聊名称',
    component: () => import('../views/chat/setGroupChatName.vue'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      showTop: false,
      title: '设置群名称',
      showAdd: true,
      showSearch: true,
      showHome: false
    }
  },{
    path: '/addGroupNumber',
    name: '添加群成员',
    component: () => import('../views/chat/addGroupNumber.vue'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      showTop: false,
      title: '添加群成员',
      showAdd: true,
      showSearch: true,
      showHome: false
    }
  },{
    path: '/groupChatFile',
    name: '群聊天文件',
    component: () => import('../views/chat/chatFile.vue'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      showTop: true,
      title: '聊天文件',
      showAdd: true,
      showSearch: true,
      showHome: false
    }
  },{
    path: '/selectLibrary',
    name: '文档库文件',
    component: () => import('../views/plate/mineMission/selectLibrary.vue'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      showTop: false,
      title: '文档库文件',
      showAdd: true,
      showSearch: true,
      showHome: false
    }
  },{
    path: '/chatSelectLibrary',
    name: '文档库文件（聊天）',
    component: () => import('../views/chat/chatSelectLibrary.vue'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      showTop: false,
      title: '文档库文件',
      showAdd: true,
      showSearch: true,
      showHome: false
    }
  },{
    path: '/auditTzIndex',
    name: '投资审计台账首页',
    component: () => import('../views/plate/auditTz/index.vue'),
    meta: {
      keepAlive: true,
      requireAuth: true,
      showTop: false,
      title: '投资审计台账',
      showAdd: true,
      showSearch: true,
      showHome: false
    }
  },{
    path: '/auditTzFilterPage',
    name: '投资审计台账查询页面',
    component: () => import('../views/plate/auditTz/auditTzFilterPage.vue'),
    meta: {
      keepAlive: true,
      requireAuth: true,
      showTop: true,
      showBack: true,
      title: '投资审计台账',
      showAdd: true,
      showSearch: true,
      showHome: false
    }
  },{
    path: '/auditTzDetails',
    name: '投资审计台账详情页面',
    component: () => import('../views/plate/auditTz/details.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      showBack: true,
      title: '投资审计台账',
      showAdd: true,
      showSearch: true,
      showHome: false
    }
  },{
    path: '/addQueryApply',
    name: '查询申请',
    component: () => import('../views/plate/queryApply/addQuery.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      showBack: true,
      title: '查询申请',
      showAdd: true,
      showSearch: true,
      showHome: false,
      keepAlive: true
    }
  },{
    path: '/dataQueryProject',
    name: '数据查询项目',
    component: () => import('../views/plate/queryApply/dataQueryProject.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      showBack: true,
      title: '数据查询项目',
      showAdd: true,
      showSearch: true,
      showHome: false
    }
  },{
    path: '/dataQueryApproval',
    name: '数据查询项目审批',
    component: () => import('../views/plate/queryApply/queryApproval.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      showBack: true,
      title: '查询申请',
      showAdd: true,
      showSearch: true,
      showHome: false
    }
  },{
    path: '/editQuery',
    name: '查询申请（修改页面）',
    component: () => import('../views/plate/queryApply/editQuery.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      showBack: true,
      title: '查询申请',
      showAdd: true,
      showSearch: true,
      showHome: false,
      keepAlive: true
    }
  },{
    path: '/centerQueryApproval',
    name: '中心领导审批页面',
    component: () => import('../views/plate/queryApply/centerQueryApproval.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      showBack: true,
      title: '查询申请',
      showAdd: true,
      showSearch: true,
      showHome: false,
    }
  },{
    path: '/feedback',
    name: '查询反馈',
    component: () => import('../views/plate/queryApply/feedback.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      showBack: true,
      title: '查询申请',
      showAdd: true,
      showSearch: true,
      showHome: false,
    }
  },{
    path: '/feedbackDetails',
    name: '查询反馈详情（待确认）',
    component: () => import('../views/plate/queryApply/feedbackDetilas.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      showBack: true,
      title: '查询申请',
      showAdd: true,
      showSearch: true,
      showHome: false,
    }
  },{
    path: '/approvalProcess',
    name: '查询流程界面',
    component: () => import('../views/plate/queryApply/process.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      showBack: true,
      title: '审核流程',
      showAdd: true,
      showSearch: true,
      showHome: false,
    }
  },{
    path: '/questionIndex',
    name: '我要答题首页',
    component: () => import('../views/plate/question/index.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      showBack: true,
      title: '我要答题',
      showAdd: true,
      showSearch: true,
      showHome: false,
    }
  },{
    path: '/everydayQuestion',
    name: '每日一答',
    component: () => import('../views/plate/question/everydayQuestion.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      showBack: true,
      title: '每日一答',
      showAdd: true,
      showSearch: true,
      showHome: false,
    }
  },{
    path: '/questionAnalysis',
    name: '答题记录',
    component: () => import('../views/plate/question/questionAnalysis.vue'),
    meta: {
      requireAuth: true,
      showTop: true,
      showBack: true,
      title: '',
      showAdd: true,
      showSearch: true,
      showHome: false,
    }
  },{
    path: '/questionAnalysisDetail',
    name: '答题记录详情',
    component: () => import('../views/plate/question/questionAnalysisDetail.vue'),
    meta: {
      requireAuth: true,
      showTop: false,
      showBack: true,
      title: '',
      showAdd: true,
      showSearch: true,
      showHome: false,
    }
  },{
    path: '/login',
    name: '登陆页',
    component: () => import('../views/login.vue'),
  }];

// 页面刷新时，重新赋值token
if (localStorage.getItem('token')) {
  store.commit('set_token', localStorage.getItem('token'))
}
  
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: router
})