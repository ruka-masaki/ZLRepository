<template>
  <div class="form-group">
    <h2>ワークフロー配信の作成</h2>

    <!-- 基準タブ -->
    <h3 class="required">基準タブ</h3>
    <select v-model="selectedCriteriaTab" required>
      <option value="" hidden>-選択してください-</option>
      <option value="workFlowCriteriaTab1">商談</option>
    </select>

    <!-- 日時項目 -->
    <h3 class="required">日時項目</h3>
    <select v-model="selectedDateTimeField" required>
      <option value="" hidden>-選択してください-</option>
      <option value="workFloeDateTimeField1">モニター日</option>
    </select>

    <!-- 送信日 -->
    <h3>送信日</h3>
    <input
      type="radio"
      name="executionDate"
      value="sameTime"
      v-model="executionDate"
      @change="handleExecutionDateChange('sameTime')"
      checked
    />
    当日（同時刻）
    <input
      type="radio"
      name="executionDate"
      value="customTime"
      v-model="executionDate"
      @change="handleExecutionDateChange('customTime')"
    />
    当日（カスタム）
    <input
      type="radio"
      name="executionDate"
      value="specifiedDay"
      v-model="executionDate"
      @change="handleExecutionDateChange('specifiedDay')"
    />
    指定日

    <!-- タイミング -->
    <div id="timingContainer">
      <h3>タイミング</h3>
      <input
        type="number"
        v-model="timing"
        placeholder="例: 3（3日前） or 5（5日後）"
        v-if="executionDate !== 'specifiedDay'"
      />
      <input
        type="number"
        v-model="timing"
        placeholder="例: -3（3日前） or 5（5日後）"
        v-if="executionDate === 'specifiedDay'"
        style="display: none"
      />
      <select v-model="dayBeforeAfter">
        <option value="" hidden>-選択してください-</option>
        <option value="dayBefore">日前</option>
        <option value="dayAfter">日後</option>
      </select>
    </div>

    <!-- 送信時刻 -->
    <div id="executionTimeContainer">
      <h3>送信時刻</h3>
      <input type="time" v-model="executionTime" />
    </div>

    <!-- テンプレート -->
    <h3 class="required">テンプレート</h3>
    <select v-model="selectedTemplate" required>
      <option value="" hidden>-選択してください-</option>
      <option value="workFlowTemplateSelect1">テストテンプレート</option>
    </select>

    <!-- 繰り返し -->
    <h3>繰り返し</h3>
    <select v-model="repetition">
      <option value="" hidden>-選択してください-</option>
      <option value="workFlowRepetition1">一度のみ</option>
      <option value="workFlowRepetition2">毎月</option>
      <option value="workFlowRepetition3">毎年</option>
    </select>

    <!-- 送信条件 -->
    <h3>
      送信条件
      <div class="tooltip-container">
        <!-- アイコン部分 -->
        <span class="tooltip-icon">i</span>
        <!-- ツールチップ部分 -->
        <div class="tooltip">
          これはツールチップのテキストです。情報を提供します。
        </div>
      </div>
    </h3>

    <!-- 追加のフィールド -->
    <div id="addWorkFlowFields">
      <!-- 追加されるフィールドはここで表示 -->
    </div>

    <button class="addMessageButton" @click="addWorkFlowMessageFields">
      ➕︎ メッセージを追加
    </button>
  </div>

  <!-- ボタンエリア -->
  <div class="button-group">
    <button id="memoryButton" @click="createDistributionList">💾 保存</button>
    <button id="resetButton" @click="resetForm">リセット</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCriteriaTab: '', // 基準タブ
      selectedDateTimeField: '', // 日時項目
      executionDate: 'sameTime', // 送信日の選択
      timing: '', // タイミング
      dayBeforeAfter: '', // 日前 or 日後
      executionTime: '', // 送信時刻
      selectedTemplate: '', // テンプレート選択
      repetition: '', // 繰り返し
    };
  },
};
</script>

<style scoped></style>
