<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue';
import Topbar from './components/topbar.vue';
import Sidebar from './components/sidebar.vue';
import MainArea from './components/mainArea.vue';
import CreateTemplate from './components/createTemplate.vue';
</script>

<template>
  <Topbar />
  <Sidebar />
  <MainArea />
  <router-view></router-view>
</template>

<style scoped></style> -->
<template>
  <Topbar />
  <Sidebar />
  <MainArea />
</template>

<script>
import Topbar from './components/topbar.vue';
import Sidebar from './components/sidebar.vue';
import MainArea from './components/mainArea.vue';
import { h } from 'vue';

export default {
  name: 'App',
  components: {
    Topbar,
    Sidebar,
    MainArea,
  },
  mounted() {
    const script = document.createElement('script');
    script.src = '/script.js';

    script.onload = () => {
      // changeMessageType();
      // changeMode('broadcast');
      // receiveMenu('broadcast');
      const chatSection = document.getElementById('chat-section');
      const mainContent = document.getElementById('main-content');
      // デフォルトではプレビューを非表示
      chatSection.style.display = 'block';
      mainContent.style.width = '100%';
    };

    document.body.appendChild(script);
  },
};
</script>

<style>
/* グローバルなスタイル */
</style>
