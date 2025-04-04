<template>
  <div id="deliveryList" class="mode" v-show="isDeliveryListVisible">
    <div id="DeliveryListList">
      <div class="listHeader">
        <h2>配信リスト</h2>
        <div class="listButtons">
          <button @click="filterDeliveryList" style="display: none">🔍︎</button>
          <button @click="createDeliveryList">➕︎</button>
          <button @click="openMenu" style="display: none">☰</button>
        </div>
      </div>
      <table class="design03" id="templateTable">
        <thead>
          <tr>
            <th>
              リスト名
              <button class="sortButton" @click="sortTable(0, 'templateTable')">
                ⇅
              </button>
            </th>
            <th>
              テンプレート名
              <button class="sortButton" @click="sortTable(1, 'templateTable')">
                ⇅
              </button>
            </th>
            <th>送信日時</th>
            <th>送信件数</th>
            <th>送信対象</th>
            <th>作成日時</th>
            <th>即時配信</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(delivery, index) in deliveryList"
            :key="index"
            @click="DeliveryListRowClickHandler(delivery)"
          >
            <td>{{ delivery.listName }}</td>
            <td>
              <a :href="delivery.templateLink">{{ delivery.templateName }}</a>
            </td>
            <td>{{ delivery.sendDate }}</td>
            <td>{{ delivery.sendCount }}</td>
            <td>{{ delivery.sendTarget }}</td>
            <td>{{ delivery.creationDate }}</td>
            <td>
              <button @click="sendTemplate(delivery)">配信</button>
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
      isDeliveryListVisible: true, // 配信リストの表示/非表示制御
      deliveryList: [
        {
          listName: 'テストリスト',
          templateLink: 'http://www.google.com',
          templateName: 'テストテンプレート',
          sendDate: '2025/02/07 10:00',
          sendCount: 500,
          sendTarget: '全体',
          creationDate: '2025/02/06 14:30',
        },
        {
          listName: 'テストリスト2',
          templateLink: 'http://www.google.com',
          templateName: 'テンプレートB',
          sendDate: '2025/02/08 12:00',
          sendCount: 777,
          sendTarget: '一部',
          creationDate: '2025/02/07 09:00',
        },
      ],
    };
  },
  methods: {
    createDeliveryList() {
      // ワークフロー配信メッセージを作成する処理
      console.log('ワークフロー配信メッセージを作成');
      this.$router.push({ name: 'createDeliveryList' });
    },
  },
};
</script>

<style scoped></style>
