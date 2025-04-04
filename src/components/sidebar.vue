<template>
  <!-- <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/message-form">メッセージ作成</router-link>
  </nav> -->

  <!-- サイドバー -->
  <aside id="sidebar">
    <details
      v-for="(item, index) in menuItems"
      :key="index"
      :name="item.name"
      :id="item.id"
    >
      <summary @click="summaryClose">{{ item.summary }}</summary>
      <button
        v-for="(button, btnIndex) in item.buttons"
        :key="btnIndex"
        @click="
          handleButtonClick(button.action);
          receiveMenu(button.action);
        "
      >
        {{ button.label }}
      </button>
    </details>
  </aside>
</template>

<script>
import '../assets/styles.css';
import { h } from 'vue';
export default {
  data() {
    return {
      // メニュー項目
      menuItems: [
        {
          name: 'messageDelivery',
          id: 'messageDelivery',
          summary: 'メッセージ',
          buttons: [
            { label: 'メッセージ作成', action: 'broadcast' },
            { label: 'メッセージ一覧', action: 'messageList' },
          ],
        },
        {
          name: 'messageDeliveryList',
          id: 'messageDeliveryList',
          summary: '配信リスト',
          buttons: [
            { label: '配信リスト', action: 'deliveryList' },
            { label: '送信履歴', action: 'transmissionHistory' },
          ],
        },
        {
          name: 'workFlow',
          id: 'workFlow',
          summary: 'ワークフロー',
          buttons: [{ label: 'ワークフロー設定', action: 'workFlowSetting' }],
        },
        {
          name: 'responseMessageSelect',
          id: 'responseMessageSelect',
          summary: '応答メッセージ',
          buttons: [
            { label: '応答メッセージ', action: 'responseMessage' },
            { label: 'あいさつメッセージ', action: 'greetingMessage' },
            { label: '営業時間外メッセージ', action: 'AfterHoursMessage' },
          ],
        },
        {
          name: 'chatMenuSelect',
          id: 'chatMenuSelect',
          summary: 'チャット',
          buttons: [{ label: 'チャット', action: 'chatMenu' }],
        },
      ],
      // selectedMode: 'broadcast', // デフォルトのモード
      // showPreview: true, // `broadcast` なら最初はプレビューを表示
    };
  },
  mounted() {
    const script = document.createElement('script');
    script.src = '/script.js';

    script.onload = () => {
      // changeMessageType();
      // changeMode('broadcast');
      // receiveMenu('broadcast');
      const chatSection = document.getElementById('chat-section');
      const mainContent = document.getElementById('main-content');
      // デフォルトではプレビューを非表示
      chatSection.style.display = 'block';
      mainContent.style.width = '100%';
    };

    document.body.appendChild(script);
  },
  methods: {
    // ボタンがクリックされたときの処理
    handleButtonClick(action) {
      // アクションに応じてページ遷移
      switch (action) {
        case 'broadcast':
          this.$router.push({ name: 'createTemplate/nomal' }); // ルート名が 'createTemplate' のページへ遷移
          break;
        case 'messageList':
          this.$router.push({ name: 'messageList' }); // ルート名が 'messageList' のページへ遷移
          break;
        case 'deliveryList':
          this.$router.push({ name: 'deliveryList' }); // ルート名が 'deliveryList' のページへ遷移
          break;
        case 'transmissionHistory':
          this.$router.push({ name: 'transmissionHistory' }); // ルート名が 'transmissionHistory' のページへ遷移
          break;
        case 'workFlowSetting':
          this.$router.push({ name: 'workFlowSetting' }); // ルート名が 'workFlowSetting' のページへ遷移
          break;
        case 'responseMessage':
          this.$router.push({ name: 'responseMessage' }); // ルート名が 'responseMessage' のページへ遷移
          break;
        case 'greetingMessage':
          this.$router.push({ name: 'greetingMessage' }); // ルート名が 'greetingMessage' のページへ遷移
          break;
        case 'AfterHoursMessage':
          this.$router.push({ name: 'afterHoursMessage' }); // ルート名が 'AfterHoursMessage' のページへ遷移
          break;
        case 'chatMenu':
          this.$router.push({ name: 'chatMenu' }); // ルート名が 'chatMenu' のページへ遷移
          break;
        default:
          console.log(`対応するアクションが見つかりません: ${action}`);
      }
    },
    summaryClose() {
      const details = document.querySelectorAll('#sidebar details');

      details.forEach((targetDetail) => {
        targetDetail.addEventListener('click', (e) => {
          // クリックされた要素が summary の場合のみ処理を実行
          if (e.target.nodeName === 'SUMMARY') {
            // 他の全てのdetailsを取得して閉じる
            details.forEach((detail) => {
              if (detail !== targetDetail && detail.hasAttribute('open')) {
                detail.removeAttribute('open');
              }
            });
          }
          // イベントの伝播を止めて、buttonのクリックイベントに影響しないようにする
          e.stopPropagation();
        });
      });
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
  computed: {
    mainContentStyle() {
      return this.showPreview
        ? { width: 'calc(100% - 420px)' }
        : { width: '100%' };
    },
  },
};
</script>

<style scoped></style>
