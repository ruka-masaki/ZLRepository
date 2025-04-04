<template>
  <div class="form-group">
    <h2>応答メッセージを作成</h2>
    <h3 class="required">タイトル</h3>
    <input v-model="responseMessageTitle" type="text" required />

    <h3>キーワード</h3>
    <input v-model="responseMessageKeyword" type="text" />

    <h3 class="required">マッチ方法</h3>
    <select v-model="matchType" required>
      <option value="">-選択してください-</option>
      <option value="exactMatch">完全一致</option>
      <option value="partialMatch">部分一致</option>
    </select>

    <h3>メッセージタイプ</h3>
    <select v-model="responseMessageType" @change="changeResponseMessageType">
      <option value="">-選択してください-</option>
      <option value="responceText">テキスト</option>
      <option value="responceImg">画像</option>
    </select>

    <div v-if="responseMessageType === 'responceText'" id="responceTextArea">
      <textarea
        v-model="responseTextMessage"
        class="input-text-field"
        maxlength="500"
        placeholder="テキストを入力"
        @keyup="updateCharCount"
      ></textarea>
      <div class="footer">
        <span class="char-counter">{{ charCount }}/500</span>
      </div>
    </div>

    <div v-if="responseMessageType === 'responceImg'" id="responceImgArea">
      <div class="custom-file-upload">
        <input
          type="file"
          id="responceImgUpload"
          accept="image/*"
          @change="previewResponseImage"
          class="file-input"
        />
        <label for="responceImgUpload" id="uploadLabel">
          <span class="upload-text">🖿 写真をアップロード</span>
          <img v-if="imagePreview" :src="imagePreview" class="image-preview" />
        </label>
      </div>
    </div>
  </div>

  <div class="button-group">
    <button @click="saveResponseMessage">💾 保存</button>
    <button @click="resetForm" style="display: none">リセット</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      responseMessageTitle: '',
      responseMessageKeyword: '',
      matchType: '',
      responseMessageType: '',
      responseTextMessage: '',
      charCount: 0,
      imagePreview: null,
    };
  },
};
</script>

<style scoped></style>
