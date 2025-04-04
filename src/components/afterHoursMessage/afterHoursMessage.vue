<template>
  <div id="AfterHoursMessage" class="mode">
    <div class="form-group">
      <h2>営業時間外メッセージを作成</h2>
      <h3>メッセージ</h3>
      <div class="afterHour-message-field">
        <div class="input-container" id="afterHourMessageContainer">
          <!-- 入力エリア -->
          <textarea
            v-model="afterHourMessageText"
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
            <button @click="saveAfterHoursMessage">💾 保存</button>
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
      afterHourMessageText: 'test', // 初期テキスト
      charCount: 0, // 文字数カウント
    };
  },
  mounted() {
    const script = document.createElement('script');
    script.src = '/script.js';

    script.onload = () => {
      receiveMenu('AfterHoursMessage');
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
