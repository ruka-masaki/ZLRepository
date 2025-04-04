<template>
  <div id="workFlowSetting" class="mode" v-show="isVisible">
    <div id="workFlowMessageContainer">
      <div class="listHeader">
        <h2>ワークフロー配信</h2>
        <div class="listButtons">
          <button @click="filterDeliveryList" style="display: none">🔍︎</button>
          <button
            @click="createWorkFlowMessage"
            id="createAfterHoursMessageButton"
          >
            ➕︎
          </button>
          <button @click="openMenu" style="display: none">☰</button>
        </div>
      </div>

      <!-- 予定テーブル -->
      <h3>予定</h3>
      <table class="design03" id="workflowScheduleTable">
        <thead>
          <tr>
            <th>日時項目</th>
            <th>送信日</th>
            <th>タイミング</th>
            <th>送信時刻</th>
            <th>
              テンプレート
              <button
                class="sortButton"
                @click="sortTable(5, 'workflowScheduleTable')"
              >
                ⇅
              </button>
            </th>
            <th>送信条件</th>
            <th>繰り返し</th>
            <th>オン/オフ</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(schedule, index) in workflowSchedule"
            :key="index"
            @click="workFlowRowClickHandler(schedule)"
          >
            <td>{{ schedule.dateItem }}</td>
            <td>{{ schedule.sendDate }}</td>
            <td>{{ schedule.timing }}</td>
            <td>{{ schedule.sendTime }}</td>
            <td>
              <a :href="schedule.templateLink">{{ schedule.template }}</a>
            </td>
            <td>{{ schedule.sendCondition }}</td>
            <td>{{ schedule.repeat }}</td>
            <td>
              <div class="toggle_button">
                <input
                  type="checkbox"
                  class="toggle_input"
                  v-model="schedule.isActive"
                />
                <label class="toggle_label"></label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 連絡先テーブル -->
      <h3>連絡先</h3>
      <table class="design03" id="workflowContactTable">
        <thead>
          <tr>
            <th>日時項目</th>
            <th>送信日</th>
            <th>タイミング</th>
            <th>送信時刻</th>
            <th>
              テンプレート
              <button
                class="sortButton"
                @click="sortTable(5, 'workflowContactTable')"
              >
                ⇅
              </button>
            </th>
            <th>送信条件</th>
            <th>繰り返し</th>
            <th>オン/オフ</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(contact, index) in workflowContact"
            :key="index"
            @click="workFlowRowClickHandler(contact)"
          >
            <td>{{ contact.dateItem }}</td>
            <td>{{ contact.sendDate }}</td>
            <td>{{ contact.timing }}</td>
            <td>{{ contact.sendTime }}</td>
            <td>
              <a :href="contact.templateLink">{{ contact.template }}</a>
            </td>
            <td>{{ contact.sendCondition }}</td>
            <td>{{ contact.repeat }}</td>
            <td>
              <div class="toggle_button">
                <input
                  type="checkbox"
                  class="toggle_input"
                  v-model="contact.isActive"
                />
                <label class="toggle_label"></label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false, // ワークフロー配信を表示するかどうか
      isCreateMessageVisible: false, // メッセージ作成フォームを表示するかどうか
      workflowSchedule: [
        {
          dateItem: 'モニター日',
          sendDate: '当日（同時刻）',
          timing: '',
          sendTime: '',
          template: 'テストテンプレート',
          templateLink: 'http://www.google.com',
          sendCondition: '撮影内容が次の値を含まない卒入園・入学',
          repeat: '一度のみ',
          isActive: false,
        },
        {
          dateItem: 'モニター日',
          sendDate: '指定日',
          timing: '1日前',
          sendTime: '11:22',
          template: 'テストテンプレート',
          templateLink: 'http://www.google.com',
          sendCondition: '撮影内容が次の値を含まない卒入園・入学',
          repeat: '一度のみ',
          isActive: false,
        },
      ],
      workflowContact: [
        {
          dateItem: '開始',
          sendDate: '当日（当日）',
          timing: '',
          sendTime: '10:10',
          template: 'テスト連絡先テンプレート',
          templateLink: 'http://www.google.com',
          sendCondition: 'LINEリマインドが次の値と等しい選択済み',
          repeat: '一度のみ',
          isActive: false,
        },
        {
          dateItem: '開始',
          sendDate: '当日（当日）',
          timing: '',
          sendTime: '11:11',
          template: 'テスト連絡先テンプレート2',
          templateLink: 'http://www.google.com',
          sendCondition: 'LINEリマインドが次の値と等しい選択済み',
          repeat: '一度のみ',
          isActive: false,
        },
      ],
    };
  },
  methods: {
    createWorkFlowMessage() {
      // ワークフロー配信メッセージを作成する処理
      console.log('ワークフロー配信メッセージを作成');
      this.$router.push({ name: 'createWorkFlowSetting' });
    },
  },
  mounted() {
    // 初期表示時にワークフロー設定画面を表示
    this.isVisible = true;
  },
};
</script>

<style scoped></style>
