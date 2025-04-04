<template>
  <div id="responseMessage" class="mode" v-show="isResponseMessageVisible">
    <div id="responseMessageContainer">
      <div class="listHeader">
        <h2>応答メッセージ</h2>
        <div class="listButtons">
          <button @click="filterDeliveryList" v-show="false">🔍︎</button>
          <button @click="createResponseMessage">➕︎</button>
          <button @click="openMenu" v-show="false">☰</button>
        </div>
      </div>

      <h3>テキスト</h3>
      <table class="design03" id="responseTextMessageTable">
        <thead>
          <tr>
            <th>
              タイトル
              <button
                class="sortButton"
                @click="sortTable(0, 'responseTextMessageTable')"
              >
                ⇅
              </button>
            </th>
            <th>キーワード</th>
            <th>マッチ方法</th>
            <th>メッセージ</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(message, index) in responseMessages"
            :key="index"
            @click="responseRowClickHandler(message)"
          >
            <td>{{ message.title }}</td>
            <td>{{ message.keyword }}</td>
            <td>{{ message.matchMethod }}</td>
            <td>
              <template v-if="message.type === 'text'">{{
                message.text
              }}</template>
              <template v-else>
                <img :src="message.image" class="imageMessage" />
              </template>
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
      isResponseMessageVisible: true, // 応答メッセージセクションの表示制御
      responseMessages: [
        {
          title: 'テスト応答メッセージ',
          keyword: '問い合わせ',
          matchMethod: '完全一致',
          type: 'text', // メッセージタイプ ('text' または 'image')
          text: 'テキスト',
        },
        {
          title: 'テスト応答メッセージ2',
          keyword: '問い合わせ',
          matchMethod: '部分一致',
          type: 'text',
          text: 'テキスト',
        },
        {
          title: 'テスト応答メッセージ',
          keyword: '問い合わせ',
          matchMethod: '完全一致',
          type: 'image',
          image: './img/cat.jpeg',
        },
        {
          title: 'テスト応答メッセージ2',
          keyword: '問い合わせ',
          matchMethod: '部分一致',
          type: 'image',
          image: './img/cat2.jpeg',
        },
      ],
    };
  },
  methods: {
    createResponseMessage() {
      // ワークフロー配信メッセージを作成する処理
      console.log('ワークフロー配信メッセージを作成');
      this.$router.push({ name: 'createResponseMessage' });
    },
  },
};
</script>

<style scoped></style>
