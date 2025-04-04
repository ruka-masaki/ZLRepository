<template>
  <header id="topbar">
    <select
      v-model="selectedChannel"
      @change="updateSelectedText"
      class="channelSelect"
    >
      <option value="">選択してください</option>
      <option value="オプション1">オプション1</option>
      <option value="オプション2">オプション2</option>
      <option value="オプション3">オプション3</option>
    </select>
    <span class="selected-text" id="selectedText">{{ selectedText }}</span>
  </header>
</template>

<script>
import { h } from 'vue';
import '../assets/styles.css';
export default {
  data() {
    return {
      selectedChannel: '', // 選択されたオプションの初期値
      selectedText: '未選択', // 初期表示のテキスト
    };
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
  methods: {
    updateSelectedText() {
      // 選択された値に基づいて表示するテキストを更新
      if (this.selectedChannel) {
        this.selectedText = this.selectedChannel;
      } else {
        this.selectedText = '未選択'; // 空の場合は「未選択」
      }
    },
  },
};
</script>

<style scoped></style>
