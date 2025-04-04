<template>
  <div class="form-group">
    <h2>配信リストを作成</h2>

    <h3 class="required">リスト名</h3>
    <input type="text" v-model="listName" required />

    <h3>送信日時</h3>
    <input type="datetime-local" v-model="sendDateTime" />

    <h3>テンプレート</h3>
    <select v-model="selectedTemplate">
      <option value="" hidden>-選択してください-</option>
      <option value="ListSendTemplate1">テストテンプレート</option>
    </select>

    <h3>備考</h3>
    <textarea
      v-model="note"
      placeholder="備考を入力"
      maxlength="500"
    ></textarea>
  </div>

  <!-- ボタンエリア -->
  <div class="button-group">
    <button @click="saveList">💾 保存</button>
    <button @click="resetForm">リセット</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listName: '',
      sendDateTime: '',
      selectedTemplate: '',
      note: '',
    };
  },
};
</script>

<style scoped></style>
