<template>
  <div id="broadcast" class="mode">
    <h2>✉️ メッセージ作成</h2>
    <h3>メッセージタイプ</h3>
    <select
      v-model="messageType"
      @change="changeMessageType($event.target.value)"
    >
      <option value="nomal">通常メッセージ</option>
      <option value="flex">フレックスメッセージ</option>
      <option value="remind">ワークフロー送信</option>
    </select>

    <!-- 通常メッセージ -->
    <div v-if="messageType === 'nomal'" id="normalMessageContainer">
      <h3 class="required">テンプレート名</h3>
      <input type="text" v-model="normalTemplateName" required />
      <h3>メッセージ</h3>
      <div id="messageFields">
        <div v-for="(message, index) in normalMessages" :key="index"></div>
      </div>
      <button class="addMessageButton" @click="script.addMessageField">
        <!-- <button class="addMessageButton"> -->➕︎ メッセージを追加
      </button>
      <button class="memoryButton" @click="sendNormalMessages">💾 保存</button>
    </div>
  </div>
</template>

<script>
import { h } from 'vue';
export default {
  data() {
    return {
      messageType: 'nomal',
      normalTemplateName: '',
      normalMessages: [{ text: '' }],
      flexTemplateName: '',
      flexImage: null,
      flexImageShape: 'rectangle',
      flexTitle: '',
      flexAltText: '',
      flexText: '',
      flexMessages: [{ text: '' }],
      remindTemplateName: '',
      criteriaTab: '',
      eventMergetab: '',
      salesOrderMergeTab: '',
      reminderMessage: '',
    };
  },
  mounted() {
    const script = document.createElement('script');
    script.src = '/script.js';

    script.onload = () => {
      addMessageField();
      // addFlexMessageField();
      // changeMessageType();
      // changeMode('broadcast');
      receiveMenu('broadcast');
      const chatSection = document.getElementById('chat-section');
      const mainContent = document.getElementById('main-content');
      // デフォルトではプレビューを非表示
      chatSection.style.display = 'block';
      mainContent.style.width = '100%';
    };

    document.body.appendChild(script);
  },
  methods: {
    changeMessageType(value) {
      // メッセージタイプが変更された時に表示を切り替える
      console.log(value);
      // this.resetFields();

      // アクションに応じてページ遷移
      switch (value) {
        case 'nomal':
          this.$router.push({ name: 'createTemplate/nomal' });
          break;
        case 'flex':
          this.$router.push({ name: 'createTemplate/flex' });
          break;
        case 'remind':
          this.$router.push({ name: 'createTemplate/remind' });
          break;
        default:
          console.log(`対応するアクションが見つかりません: ${value}`);
      }
    },
  },
};
</script>

<style scoped>
/* ここにCSSを追加 */
</style>
