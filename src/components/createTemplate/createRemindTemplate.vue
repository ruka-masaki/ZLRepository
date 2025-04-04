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

    <!-- ワークフロー送信 -->
    <div v-if="messageType === 'remind'" id="remindeContainer">
      <h3 class="required">テンプレート名</h3>
      <input type="text" v-model="remindTemplateName" required />
      <h3>基準タブ</h3>
      <select v-model="criteriaTab" @change="changeCriteriaTab">
        <option value="">-選択してください-</option>
        <option value="criteriaTab1">予定</option>
        <option value="criteriaTab2">受注書</option>
      </select>
      <h3 v-if="criteriaTab" id="criteriaTabTitle" style="display: none">
        差し込みタブ
      </h3>

      <!-- 予定タブの場合 -->
      <div v-if="criteriaTab === 'criteriaTab1'" id="schedule">
        <select v-model="eventMergetab" @change="changeEventMergetab">
          <option value="">-選択してください-</option>
          <option value="criteriaTab1">予定</option>
          <option value="criteriaTab2">商談</option>
        </select>
      </div>
      <!-- 受注書タブの場合 -->
      <div v-if="criteriaTab === 'criteriaTab2'" id="salesOrder">
        <select v-model="salesOrderMergeTab" @change="changeSalesOrderMergeTab">
          <option value="">-選択してください-</option>
          <option value="criteriaTab1">受注書</option>
          <option value="criteriaTab2">商談</option>
        </select>
      </div>

      <h3>本文</h3>
      <div id="reminderMessage">
        <textarea
          v-model="reminderMessage"
          class="input-text-field"
          placeholder="メッセージを入力"
          maxlength="500"
          @keyup="sendTextMessage('reminderMessage')"
        ></textarea>
        <div class="footer">
          <span class="char-counter">{{ reminderMessage.length }}/500</span>
        </div>
      </div>
      <button class="memoryButton" @click="scheduleReminder">💾 保存</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageType: 'remind',
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
