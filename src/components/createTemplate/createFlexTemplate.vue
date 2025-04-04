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

    <!-- フレックスメッセージ -->
    <div v-if="messageType === 'flex'" id="flexMessageContainer">
      <h3 class="required">テンプレート名</h3>
      <input type="text" v-model="flexTemplateName" required />
      <h3>画像</h3>
      <div class="custom-file-upload">
        <input
          type="file"
          id="flexImageUpload"
          accept="image/*"
          @change="previewFlexImage"
        />
        <label for="flexImageUpload" id="uploadLabel">
          <span class="upload-text">🖿 写真をアップロード</span>
          <img
            id="flexImagePreview"
            class="image-preview"
            v-if="flexImage"
            :src="flexImage"
          />
        </label>
      </div>
      <h3>画像の形</h3>
      <select v-model="flexImageShape">
        <option value="rectangle">長方形</option>
        <option value="circle">正方形</option>
      </select>

      <h3>タイトル</h3>
      <input type="text" v-model="flexTitle" placeholder="タイトルを入力" />

      <h3>通知テキスト</h3>
      <input
        type="text"
        v-model="flexAltText"
        placeholder="通知テキストを入力"
      />

      <h3>メッセージ</h3>
      <div id="flexText">
        <textarea
          v-model="flexText"
          placeholder="本文を入力"
          maxlength="500"
          @keyup="textCountor('flexText')"
        ></textarea>

        <div class="footer">
          <span class="char-counter">{{ flexText.length }}/500</span>
        </div>
      </div>
      <h3>フレックスボタン</h3>
      <div id="flexMessageFields">
        <div v-for="(message, index) in flexMessages" :key="index"></div>
      </div>
      <button class="addMessageButton" @click="addFlexMessageField">
        ➕︎ メッセージを追加
      </button>
      <button class="memoryButton" @click="sendFlexMessage">💾 保存</button>
    </div>
  </div>
</template>

<script>
import { h } from 'vue';
export default {
  data() {
    return {
      messageType: 'flex',
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
      // addMessageField();
      addFlexMessageField();
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
