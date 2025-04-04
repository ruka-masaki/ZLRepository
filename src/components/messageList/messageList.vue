<template>
  <div id="messageList" class="mode" v-show="isMessageListVisible">
    <div id="messageListContainer">
      <div class="listHeader">
        <h2>メッセージ一覧</h2>
        <div class="listButtons">
          <button @click="filterDeliveryList" style="display: none">🔍︎</button>
          <button @click="createTenplate">➕︎</button>
          <button @click="openMenu" style="display: none">☰</button>
        </div>
      </div>
      <h3>一斉送信</h3>
      <table class="design03" id="massSendingTable">
        <thead>
          <tr>
            <th>
              テンプレート名
              <button
                class="sortButton"
                @click="sortTable(0, 'massSendingTable')"
              >
                ⇅
              </button>
            </th>
            <th>メッセージ種別</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a :href="'edit.html?type=normal'">テンプレートA</a></td>
            <td>通常メッセージ</td>
          </tr>
          <tr>
            <td><a :href="'edit.html?type=flex'">テンプレートB</a></td>
            <td>フレックスメッセージ</td>
          </tr>
        </tbody>
      </table>

      <h3>ワークフロー送信</h3>
      <table class="design03" id="reminderSendingTable">
        <thead>
          <tr>
            <th>
              テンプレート名
              <button
                class="sortButton"
                @click="sortTable(0, 'reminderSendingTable')"
              >
                ⇅
              </button>
            </th>
            <th>基準タブ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a :href="'edit.html?type=remind'">テンプレートA</a></td>
            <td>受注書</td>
          </tr>
          <tr>
            <td><a :href="'edit.html?type=remind'">テンプレートB</a></td>
            <td>受注書</td>
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
      isMessageListVisible: true, // メッセージリストの表示/非表示制御
    };
  },
  methods: {
    createTenplate() {
      // ワークフロー配信メッセージを作成する処理
      console.log('ワークフロー配信メッセージを作成');
      this.$router.push({ name: 'createTemplate/nomal' });
      receiveMenu('broadcast');
    },
    receiveMenu(value) {
      // 全てのモードを非表示にする
      const modes = document.querySelectorAll('.mode');
      modes.forEach((mode) => (mode.style.display = 'none'));

      // 選択されたモードを表示する
      const selectedMode = document.getElementById(value);
      if (selectedMode) {
        selectedMode.style.display = 'block';
      }

      // チャットプレビューの表示制御
      const chatSection = document.getElementById('chat-section');
      const mainContent = document.getElementById('main-content');

      // 初回ロード時に「broadcast」モードが選ばれると仮定して、強制的にクラスを追加
      if (
        value === 'broadcast' ||
        value === 'CreateResponseMessage' ||
        value === 'greetingMessage' ||
        value === 'AfterHoursMessage'
      ) {
        // プレビューを表示
        chatSection.style.display = 'flex';
        mainContent.style.width = 'calc(100% - 420px)';
        document.body.classList.add('show-preview'); // トークプレビューの表示クラスを強制的に追加
      } else {
        // プレビューを非表示
        chatSection.style.display = 'none';
        mainContent.style.width = '100%';
        document.body.classList.remove('show-preview'); // 表示クラスを削除
      }
    },
  },
};
</script>

<style scoped></style>
