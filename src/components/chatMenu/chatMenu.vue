<template>
  <div class="div">
    <div class="div2">
      <div class="div3">
        <div class="div4">
          <div class="input">
            <div class="div5">チャットを検索</div>
          </div>
          <div class="frame2">
            <img class="frame3" src="../../assets/frame1.svg" />
          </div>
        </div>
      </div>

      <div class="div6">
        <div class="chat-item" data-chat-id="1">
          <div class="div7">
            <img class="img" src="../../assets/img0.png" />
            <div class="div8">
              <div class="div9">
                <div class="div10">山田 太郎</div>
                <div class="_14-30">14:30</div>
              </div>
              <div class="div11 chat-preview-message">
                次の会議について確認させててててててててててててててててってててて
              </div>
            </div>
          </div>
        </div>
        <div class="chat-item" data-chat-id="2">
          <div class="div12">
            <img class="img" src="../../assets/img1.png" />
            <div class="div13">
              <div class="div9">
                <div class="div10">佐藤 花子</div>
                <div class="_13-15">13:15</div>
              </div>
              <div class="div11 chat-preview-message">
                資料の共有ありがとうございます。
              </div>
            </div>
          </div>
        </div>
        <div class="chat-item" data-chat-id="3">
          <div class="div16">
            <img class="img" src="../../assets/img2.png" />
            <div class="div13">
              <div class="div9">
                <div class="div10">鈴木 一郎</div>
                <div class="div17">昨日</div>
              </div>
              <div class="div11 chat-preview-message">
                プロジェクトの進捗状況について
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="div19">
      <div id="header-wrapper" class="position-relative w-100 bg-main">
        <div
          id="header-content"
          class="header w-100 d-block justify-content-end align-items-center px-1 bg-main text-dark border-bottom"
        >
          <div class="left pt-1 ms-1">
            <div>
              <button id="block" class="btn btn-sm btn-light">ブロック</button>
            </div>
          </div>
          <div class="right pt-1">
            <button id="reload_btn" class="btn btn-sm btn-outline-dark mx-1">
              更新
            </button>
            <button class="btn btn-sm btn-light ms-3" id="end_btn">終了</button>
          </div>
        </div>
      </div>

      <div class="main h-100 w-100 d-flex flex-column">
        <div
          class="content d-flex flex-column flex-fill border-top border-bottom overflow-auto"
        >
          <div
            :class="{ 'd-none': chatLogs.length == 0 }"
            class="d-flex justify-content-center"
          >
            <button
              class="btn btn-outline-accent mt-2"
              @click="getOldLINEChatData"
            >
              過去チャットの取得
            </button>
          </div>

          <div class="chat-log">
            <div class="balloon" v-for="chat in chatLogs" :key="chat.chatId">
              <div class="chat-message">{{ chat.message }}</div>
            </div>
          </div>
        </div>

        <div class="footer d-flex align-items-end bg-main p-1">
          <div
            id="btn-wrapper"
            class="d-flex align-items-center bg-white me-1 rounded"
          >
            <div id="buttons">
              <input
                ref="inputFile"
                type="file"
                accept="image/png, image/jpeg, video/mp4, application/pdf, audio/mp3"
                id="upload-file"
                class="d-none"
                @change="selectedFile"
              />
              <div
                v-if="isSelectedFile"
                class="d-flex justify-content-between align-items-center mx-2"
              >
                <span
                  id="file-name-display"
                  class="me-1 flex-fill overflow-auto text-nowrap"
                  >{{ inputFileName }}</span
                >
                <div class="text-nowrap d-flex align-items-center">
                  <button
                    id="send-file-button"
                    class="btn btn-sm btn-main py-0 me-1"
                    @click="sendFile"
                    :disabled="isSending"
                  >
                    <span
                      class="spinner-border spinner-border-sm"
                      :class="{ active: isSending }"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    送信
                  </button>
                  <button
                    id="send-file-button"
                    class="btn btn-sm btn-outline-secondary py-0"
                    @click="cancelFile"
                    :disabled="isSending"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
              <div v-else>
                <label
                  id="upload-file-label"
                  for="upload-file"
                  class="d-flex align-items-center justify-content-center btn btn-sm btn-outline-dark p-0 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-image-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"
                    />
                  </svg>
                </label>
              </div>
            </div>
          </div>

          <div
            id="sticker-wrapper"
            class="d-flex align-items-center bg-white me-1 rounded"
            @click="selectSticker"
          >
            <div id="sticker">
              <label
                id="sticker-label"
                for="sticker"
                class="d-flex align-items-center justify-content-center btn btn-sm btn-outline-dark p-0 rounded"
              >
                <i class="far fa-smile"></i>
              </label>
            </div>
          </div>

          <div v-if="!isSelectedFile" class="d-flex align-items-center w-100">
            <textarea
              class="flex-fill me-1 rounded"
              rows="1"
              v-model="message"
              @keyup="resizeTextarea"
            ></textarea>
            <div class="bg-white rounded-1">
              <button
                id="send-message-button"
                class="btn btn-sm btn-light"
                @click="sendMessage"
                :disabled="isDisabledSendButton || isSending"
              >
                <span
                  class="spinner-border spinner-border-sm"
                  :class="{ active: isSending }"
                  role="status"
                  aria-hidden="true"
                ></span>
                送信
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div33">
      <div class="div34">
        <div class="div35">
          <img class="img4" id="CRMAvatar" />
          <div class="div36" id="CRMName"></div>
          <div class="div37" id="CRMCompany"></div>
        </div>
        <div class="div38">
          <div class="div39">プロフィール情報</div>
          <div class="div40">
            <div class="div41">
              <div class="frame9">
                <img class="frame10" src="../../assets/frame9.svg" />
              </div>
              <div class="div42" id="CRMPost"></div>
            </div>
            <div class="div43">
              <div class="frame9">
                <img class="frame11" src="../../assets/frame11.svg" />
              </div>
              <div class="yamada-t-company-com" id="CRMEmail"></div>
            </div>
            <div class="div44">
              <div class="frame9">
                <img class="frame12" src="../../assets/frame13.svg" />
              </div>
              <div class="_03-1234-5678" id="CRMPhone"></div>
            </div>
            <div class="div45">
              <div class="frame13">
                <img class="frame14" src="../../assets/frame15.svg" />
              </div>
              <div class="div46" id="CRMAddress"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/app.48df0472.css';
import '../../assets/app.78d0699e.css';
export default {
  data() {
    return {
      chatLogs: [
        {
          chatId: 1,
          name: '山田 太郎',
          time: '14:30',
          previewMessage: '次の会議について確認させて...',
          avatar: '../../assets/img0.png',
        },
        {
          chatId: 2,
          name: '佐藤 花子',
          time: '13:15',
          previewMessage: '資料の共有ありがとうございます。',
          avatar: '.../../assets/img1.png',
        },
        {
          chatId: 3,
          name: '鈴木 一郎',
          time: '昨日',
          previewMessage: 'プロジェクトの進捗状況について',
          avatar: '../../assets/img2.png',
        },
      ],
      message: '',
      isSending: false,
      isSelectedFile: false,
      inputFileName: '',
      isDisabledSendButton: false,
    };
  },
  mounted() {
    const script = document.createElement('script');
    script.src = '/script.js';

    script.onload = () => {
      addMessageField();
      // addFlexMessageField();
      // changeMessageType();
      // changeMode('broadcast');
      receiveMenu('chatMenu');
      const chatSection = document.getElementById('chat-section');
      const mainContent = document.getElementById('main-content');
      // デフォルトではプレビューを非表示
      chatSection.style.display = 'block';
      mainContent.style.width = '100%';
    };

    document.body.appendChild(script);
    // ページが読み込まれた際にtextResize()を実行
    this.textResize();
  },
  methods: {
    textResize() {
      const messageElements = document.querySelectorAll('.div11');

      messageElements.forEach((element) => {
        this.truncateText(element, 2); // 2行に制限
      });

      window.addEventListener('resize', function () {
        messageElements.forEach((element) => {
          truncateText(element, 2);
        });
      });
    },

    truncateText(element, maxLines) {
      const computedStyle = window.getComputedStyle(element);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const maxHeight = lineHeight * maxLines;

      if (!element.dataset.originalText) {
        element.dataset.originalText = element.textContent;
      }

      let text = element.dataset.originalText;
      element.textContent = text;

      // 高さが最大行数を超えている場合に省略処理
      if (element.scrollHeight > maxHeight) {
        console.log(`📝 Truncating text for element: ${element.textContent}`);
        while (element.scrollHeight > maxHeight) {
          text = text.slice(0, -1); // 1文字ずつ削除
          element.textContent = text + '...'; // 末尾に「...」を追加
        }
      }
    },
  },
};
</script>

<style scoped>
/* ここに必要なスタイルを追加できます */
</style>
