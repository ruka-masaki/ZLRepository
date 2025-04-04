<template>
  <div id="main-area">
    <!-- メインコンテンツ -->
    <section id="main-content">
      <!-- メインコンテンツがここに来る -->
      <router-view></router-view>
    </section>

    <!-- チャットプレビュー -->
    <section id="chat-section">
      <div class="message-input">
        <p id="sendMessage" class="sendMessage">
          トーク画面プレビュー
          <!-- コメントアウトされたボタン -->
          <!-- <button id="toggleChatSection" @click="chatSectionNone">✖️</button> -->
        </p>
      </div>
      <div class="chat-preview" id="chatPreview">
        <!-- チャットプレビューの内容がここに表示される -->
        <slot name="chatPreview"></slot>
      </div>
    </section>
  </div>
</template>

<script>
import '../assets/styles.css';
</script>

<style scoped></style>
