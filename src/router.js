// router.js
import { createRouter, createWebHistory } from 'vue-router';
import CreateNomalTemplate from './components/createTemplate/createNomalTemplate.vue';
import CreateFlexTemplate from './components/createTemplate/createFlexTemplate.vue';
// import CreateFlexTemplate from './components/createTemplate/createFlexTemplate.html';
import CreateRemindTemplate from './components/createTemplate/createRemindTemplate.vue';
import MessageList from './components/messageList/messageList.vue';
import DeliveryList from './components/deliveryList/deliveryList.vue';
import CreateDeliveryList from './components/deliveryList/createDeliveryList.vue';
import TransmissionHistory from './components/transmissionHistory/transmissionHistory.vue';
import WorkFlowSetting from './components/workFlow/workFlowSetting.vue';
import CreateWorkFlowSetting from './components/workFlow/createWorkFlowSetting.vue';
import RsponseMessage from './components/responseMessage/responseMessage.vue';
import CreateResponseMessage from './components/responseMessage/createResponseMessage.vue';
import GreetingMessage from './components/greetingMessage/greetingMessage.vue';
import AfterHoursMessage from './components/afterHoursMessage/afterHoursMessage.vue';
import ChatMenu from './components/chatMenu/chatMenu.vue';

const routes = [
  {
    path: '/createTemplate/nomal',
    component: CreateNomalTemplate,
    name: 'createTemplate/nomal',
  },
  {
    path: '/createTemplate/flex',
    component: CreateFlexTemplate,
    name: 'createTemplate/flex',
  },
  {
    path: '/createTemplate/remind',
    component: CreateRemindTemplate,
    name: 'createTemplate/remind',
  },
  {
    path: '/messageList',
    component: MessageList,
    name: 'messageList',
  },
  {
    path: '/deliveryList',
    component: DeliveryList,
    name: 'deliveryList',
  },
  {
    path: '/deliveryList',
    component: DeliveryList,
    name: 'deliveryList',
  },
  {
    path: '/createDeliveryList',
    component: CreateDeliveryList,
    name: 'createDeliveryList',
  },
  {
    path: '/transmissionHistory',
    component: TransmissionHistory,
    name: 'transmissionHistory',
  },
  {
    path: '/workFlowSetting',
    component: WorkFlowSetting,
    name: 'workFlowSetting',
  },
  {
    path: '/createWorkFlowSetting',
    component: CreateWorkFlowSetting,
    name: 'createWorkFlowSetting',
  },
  {
    path: '/responseMessage',
    component: RsponseMessage,
    name: 'responseMessage',
  },
  {
    path: '/createResponseMessage',
    component: CreateResponseMessage,
    name: 'createResponseMessage',
  },
  {
    path: '/greetingMessage',
    component: GreetingMessage,
    name: 'greetingMessage',
  },
  {
    path: '/afterHoursMessage',
    component: AfterHoursMessage,
    name: 'afterHoursMessage',
  },
  {
    path: '/chatMenu',
    component: ChatMenu,
    name: 'chatMenu',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
