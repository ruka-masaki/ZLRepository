<template>
  <div id="greetingMessage" class="mode">
    <div class="form-group">
      <h2>あいさつメッセージを作成</h2>
      <h3>メッセージ</h3>
      <div class="greeting-message-field">
        <div class="input-container" id="greetingMessageContainer">
          <!-- 入力エリア -->
          <textarea
            v-model="greetingMessageText"
            class="input-text-field"
            maxlength="500"
            placeholder="テキストを入力"
            @keyup="updateCharCount"
          ></textarea>
          <div class="footer">
            <span id="char-counter" class="char-counter"
              >{{ charCount }}/500</span
            >
          </div>
          <!-- ボタンエリア -->
          <div class="button-group">
            <button @click="saveGreetingMessage">💾 保存</button>
            <button @click="resetForm" style="display: none">リセット</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greetingMessageText: 'test', // 初期テキスト
      charCount: 0, // 文字数カウント
    };
  },
  mounted() {
    const script = document.createElement('script');
    script.src = '/script.js';

    script.onload = () => {
      receiveMenu('greetingMessage');
      const chatSection = document.getElementById('chat-section');
      const mainContent = document.getElementById('main-content');
      // デフォルトではプレビューを非表示
      chatSection.style.display = 'block';
      mainContent.style.width = '100%';
    };

    document.body.appendChild(script);
    // ページが読み込まれた際にtextResize()を実行
  },
};
</script>

<style scoped></style>
