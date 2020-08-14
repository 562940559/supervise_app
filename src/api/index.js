/**
  * api接口的统一出口
  */

import base from '@/api/base';

import login from '@/api/login';
import work from '@/api/work';
import mailList from '@/api/mailList';
import mine from '@/api/mine';
import createTask from '@/api/createTask';
import mineMission from '@/api/mineMission';
import approval from '@/api/approval';
import statistics from '@/api/statistics';
import takeLeadMission from '@/api/takeLeadMission';
import undertakeMission from '@/api/undertakeMission';
import coordinationMission from '@/api/coordination';
import missionDistribution from '@/api/missionDistribution';
import fileMission from '@/api/fileMission';
import notice from '@/api/notice';
import zprwCreateTask from '@/api/zprwCreateTask';
import zprwApproval from '@/api/zprwApproval';
import zprwReport from '@/api/zprwReport';
import zprwFileMission from '@/api/zprwFileMission';
import zprwStatistics from '@/api/zprwStatistics';
import auditSystem from '@/api/auditSystem';
import chat from '@/api/chat';
import historyMission from '@/api/historyMission';
import auditTz from '@/api/auditTz';
import queryApply from '@/api/queryApply';
import question from '@/api/question';

export default {
  base,
  login,
  work,
  mailList,
  mine,
  createTask,
  mineMission,
  approval,
  statistics,
  takeLeadMission,
  undertakeMission,
  coordinationMission,
  missionDistribution,
  fileMission,
  notice,
  zprwCreateTask,
  zprwApproval,
  zprwReport,
  zprwFileMission,
  zprwStatistics,
  auditSystem,
  chat,
  historyMission,
  auditTz,
  queryApply,
  question
}