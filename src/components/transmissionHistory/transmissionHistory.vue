<template>
  <div id="transmissionHistory" class="mode" v-show="isVisible">
    <div id="transmissionHistoryContainer">
      <div class="listHeader">
        <h2>送信履歴</h2>
        <div class="listButtons">
          <button @click="filterDeliveryList" style="display: none">🔍︎</button>
          <button @click="addTransmissionHistory" style="display: none">
            ➕︎
          </button>
          <button @click="openMenu" style="display: none">☰</button>
        </div>
      </div>
      <table class="design03" id="transmissionHistoryTable">
        <thead>
          <tr>
            <th>送信対象</th>
            <th>
              テンプレート
              <button
                class="sortButton"
                @click="sortTable(1, 'transmissionHistoryTable')"
                style="display: none"
              >
                ⇅
              </button>
            </th>
            <th>送信日時</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(history, index) in transmissionHistory"
            :key="index"
            @click="rowClickHandler(history)"
          >
            <td>{{ history.target }}</td>
            <td>
              <a :href="history.templateLink">{{ history.template }}</a>
            </td>
            <td>{{ history.sendDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div id="CreateTransmissionHistory"></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false, // 送信履歴を表示するかどうか
      transmissionHistory: [
        {
          target: 'マサキルカ',
          template: 'テンプレートA',
          templateLink: 'http://www.google.com',
          sendDate: '2025/02/07 15:20:00',
        },
        {
          target: 'マサキルカ',
          template: 'テンプレートB',
          templateLink: 'http://www.google.com',
          sendDate: '2025/02/07 15:20:11',
        },
      ],
    };
  },
  mounted() {
    // 初期表示の際に送信履歴を表示するかどうか決定
    this.isVisible = true; // 初期表示時に履歴を表示
  },
};
</script>

<style scoped></style>
