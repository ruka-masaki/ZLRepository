// ✅ ページ読み込み時に初期設定
window.onload = function () {
  // addMessageField();
  // addFlexMessageField();
  // addWorkFlowMessageFields();
  // changeMessageType();
  // changeMode('broadcast');
  // receiveMenu('broadcast');
  const chatSection = document.getElementById('chat-section');
  const mainContent = document.getElementById('main-content');
  // デフォルトではプレビューを非表示
  chatSection.style.display = 'block';
  mainContent.style.width = '100%';
};

// メッセージタイプの切り替え
// function changeMessageType() {
//   const selectedType = document.getElementById('messageTypeSelect').value;
//   const containers = {
//     normal: 'normalMessageContainer',
//     flex: 'flexMessageContainer',
//     remind: 'remindeContainer',
//   };

//   // すべてのコンテナを非表示
//   Object.values(containers).forEach((containerId) => {
//     console.log(containerId);
//     console.log(document.getElementById(containerId));
//     document.getElementById(containerId).style.display = 'none';
//   });

//   // 選択されたコンテナを表示
//   document.getElementById(containers[selectedType]).style.display = 'block';
// }

// メニュー選択時の処理
function receiveMenu(value) {
  console.log(value);
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
}
window.receiveMenu = receiveMenu;

// チャンネル選択時の処理
function showSelectedChannel(value) {
  document.getElementById('selectedText').textContent = value || '未選択';
}

// ✅ メッセージタイプの切り替え
function changeMode(mode) {
  document
    .querySelectorAll('.mode')
    .forEach((el) => (el.style.display = 'none'));
  document.getElementById(mode).style.display = 'block';
  // changeMessageType();
}

// ✅ 通常メッセージの追加
function addMessageField() {
  console.log('外部スクリプトから addMessageField が呼ばれました');
  const container = document.getElementById('messageFields');
  console.log(container);
  const id = `message_${Date.now()}`;

  const field = document.createElement('div');
  field.classList.add('message-field');
  field.setAttribute('id', id);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('removeButton');
  deleteButton.textContent = '❌ 削除';
  deleteButton.addEventListener('click', () => this.removeMessageField(id));

  field.innerHTML = `
      <div class="input-container">
              <div class="toolbar">
                  <button value="text" data-toolbar="テキスト"><span id="textIcon" class="icon selected" onclick="showTextInput('${id}')">T</span></button>
                  <button value="image" data-toolbar="画像"><span id="imageIcon" class="icon" onclick="showImageUpload('${id}')">🖼️</span></button>
                  <button value="richMessage" data-toolbar="リッチメッセージ"><span id="richMessageIcon" class="icon" onclick="showRichMessage('${id}')">📷</span></button>
                  <button value="richVideo" data-toolbar="リッチビデオメッセージ"><span id="richVideoIcon" class="icon" onclick="showRichVideo('${id}')">🎥</span></button>
              </div>
          <!-- 入力エリア -->
          <textarea  id="input-area" class="input-text-field" maxlength="500" placeholder="テキストを入力" onkeyup="textCountor('${id}'); sendTextMessage('${id}');"></textarea>
          <!-- 入力フォームの画像部分 -->
          <div class="input-image-field" style="display: none;">
              <div class="custom-file-upload">
                  <input type="file" id="nomalImg_${id}" class="file-input" accept="image/*" onchange="previewNomalImage('${id}'); sendMessage('${id}');">
                  <label for="nomalImg_${id}">
                      <span class="upload-text">🖿 写真をアップロード</span>
                      <img class="image-preview" style="display: none;">
                  </label>
              </div>
          </div>
          <!-- リッチメッセージアップロード欄 -->
          <div id="imageSelectContainer_${id}" class="imageSelectContainer" style="display: none;">
              <div class="custom-file-upload">
                  <input type="file" id="richMessageUpload_${id}" accept="image/*" 
                      onchange="previewRichMessage('${id}'); sendMessage('${id}');" 
                      class="file-input">
                  <label for="richMessageUpload_${id}" id="uploadLabel">
                      <span class="upload-text">🖿 写真をアップロード</span>
                      <img id="richMessagePreview_${id}" class="image-preview" style="display: none;">
                  </label>
              </div>
              <input type="text" id="imageAltText_${id}" placeholder="画像代替テキスト">
              <input type="url" id="richImageUrl_${id}" placeholder="URL">
          </div>
          <!-- リッチビデオアップロード欄 -->
          <div id="videoSelectContainer_${id}" class="videoSelectContainer" style="display: none;">
              <div class="custom-file-upload">
                  <input type="file" id="richVideoUpload_${id}" accept="video/*" 
                      onchange="previewRichVideo('${id}'); sendMessage('${id}');" class="file-input">
                  <label for="richVideoUpload_${id}" id="uploadLabel">
                      <span class="upload-text">🖿 動画をアップロード</span>
                      <video id="richVideoPreview_${id}" class="media-preview" style="display: none;"></video>
                  </label>
              </div>
              <input type="text" id="videoAltText_${id}" placeholder="動画代替テキスト">
              <select id="action_${id}" name="actionButton" class="selected-action-text">
                  <option hidden>アクションボタン</option>
                  <option value="action1">詳細はこちら</option>
                  <option value="action2">インストールする</option>
                  <option value="action3">購入する</option>
                  <option value="action4">予約する</option>
                  <option value="action5">応募する</option>
                  <option value="action6">申し込む</option>
                  <option value="action7">参加する</option>
                  <option value="action8">投票する</option>
                  <option value="action9">お店を探す</option>
                  <option value="action10">お問い合わせはこちら</option>
                  <option value="action11">資料を請求する</option>
                  <option value="action12">他の動画を見る</option>
                  <option value="action13">その他</option>
              </select>
              <input type="url" id="richVideoUrl_${id}" placeholder="URL">
          </div>
          <div class="footer">
              <span id="char-counter" class="char-counter">0/500</span>
          </div>
      </div>
  `;
  console.log(container);
  container.appendChild(field);

  const removeArea = document.getElementById(id);
  const removeButtonArea = removeArea.querySelector('.input-container');
  removeButtonArea.appendChild(deleteButton);
  // フォームの入力監視を開始
  observeFormInputs(field);
}

// メッセージ作成画面の表示

// テキスト入力
function showTextInput(id) {
  const field = document.getElementById(id);
  if (field.querySelector('.input-image-field') != null) {
    field.querySelector('.input-text-field').style.display = 'block';
    field.querySelector('.input-image-field').style.display = 'none';
    field.querySelector('.imageSelectContainer').style.display = 'none';
    field.querySelector('.videoSelectContainer').style.display = 'none';
  } else {
    field.querySelector('.input-text-field').style.display = 'block';
    field.querySelector('.input-url-field').style.display = 'none';
  }
  // field.querySelector(".icon.selected").classList.add("selected");
  // field.querySelector(".icon").classList.remove("selected");
}

// 画像アップロード
function showImageUpload(id) {
  const field = document.getElementById(id);
  field.querySelector('.input-text-field').style.display = 'none';
  field.querySelector('.input-image-field').style.display = 'block';
  field.querySelector('.imageSelectContainer').style.display = 'none';
  field.querySelector('.videoSelectContainer').style.display = 'none';
  // field.querySelector(".icon").classList.add("selected");
  // field.querySelector(".icon.selected").classList.remove("selected");
}

// リッチメッセージアップロード
function showRichMessage(id) {
  const field = document.getElementById(id);
  field.querySelector('.input-text-field').style.display = 'none';
  field.querySelector('.input-image-field').style.display = 'none';
  field.querySelector('.imageSelectContainer').style.display = 'block';
  field.querySelector('.videoSelectContainer').style.display = 'none';
  // field.querySelector(".icon").classList.add("selected");
  // field.querySelector(".icon.selected").classList.remove("selected");
}

// リッチメッセージアップロード
function showRichVideo(id) {
  const field = document.getElementById(id);
  field.querySelector('.input-text-field').style.display = 'none';
  field.querySelector('.input-image-field').style.display = 'none';
  field.querySelector('.imageSelectContainer').style.display = 'none';
  field.querySelector('.videoSelectContainer').style.display = 'block';
  // field.querySelector(".icon").classList.add("selected");
  // field.querySelector(".icon.selected").classList.remove("selected");
}

// URL入力
function showUrlInput(id) {
  const field = document.getElementById(id);
  field.querySelector('.input-text-field').style.display = 'none';
  field.querySelector('.input-url-field').style.display = 'block';
  // field.querySelector(".icon").classList.add("selected");
  // field.querySelector(".icon.selected").classList.remove("selected");
}

// 画像プレビュー
function previewNomalImage(id) {
  const field = document.getElementById(id); // 親フォームを取得

  const file = field.querySelector('.file-input').files[0]; // 入力ファイルを取得
  const preview = field.querySelector('.image-preview'); // プレビュー画像を取得

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result; // プレビュー画像に読み込んだデータを設定
      preview.style.display = 'block'; // プレビューを表示
    };
    reader.readAsDataURL(file); // ファイルをデータURLに変換して読み込む
  } else {
    preview.style.display = 'none'; // ファイルが選択されていなければプレビューを非表示
    console.log('画像が選択されていません');
  }
}

// 入力時に文字数をカウント
function textCountor(id) {
  const field = document.getElementById(id);
  if (!field) {
    console.error(`フィールド "${id}" が見つかりません`);
    return;
  }
  const inputArea = field.querySelector('.input-text-field');
  const charCounter = field.querySelector('.char-counter');
  if (!inputArea || !charCounter) {
    console.error('入力欄またはカウンターが見つかりません');
    return;
  }
  const currentLength = inputArea.value.length;
  charCounter.textContent = `${currentLength}/500`;
}

// ✅ メッセージの入力タイプを変更
function changeMessageInput(id) {
  const field = document.getElementById(id);
  const type = field.querySelector('select').value;
  const textInput = field.querySelector('.text-input');
  const imageInput = field.querySelector('.image-input');
  const imagePreview = field.querySelector('.image-preview');

  if (type === 'text') {
    textInput.style.display = 'block';
    imageInput.style.display = 'none';
    imagePreview.style.display = 'none';
  } else {
    textInput.style.display = 'none';
    imageInput.style.display = 'block';
  }
}

// ✅ フレックスメッセージの画像プレビュー
function previewFlexImage() {
  const file = document.getElementById('flexImageUpload').files[0];
  const preview = document.getElementById('flexImagePreview');

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
      // imgIcon.style.display = "none";
    };
    reader.readAsDataURL(file);
  }
}

// ✅ メッセージフィールドと関連するプレビューを削除
function removeMessageField(id) {
  const messageField = document.getElementById(id);
  if (messageField) {
    messageField.remove();
  }

  // 関連する画像プレビューも削除
  const chatPreview = document.querySelector('.chat-preview');
  if (chatPreview) {
    const imagePreview = chatPreview.querySelector(`[data-id='${id}']`);
    if (imagePreview) {
      imagePreview.remove();
    }
  }
}

// ✅ フレックスメッセージの追加行（URL / メッセージ）
function addFlexMessageField() {
  const container = document.getElementById('flexMessageFields');
  const id = `message_${Date.now()}`;
  const field = document.createElement('div');
  field.classList.add('flex-message-field');
  field.setAttribute('id', id);

  field.innerHTML = `
      <div class="input-container" onkeyup="sendMessage('${id}')">
          <div class="toolbar">
              <button value="text" data-toolbar="テキスト"><span id="textIcon" class="icon selected"
              onclick="showTextInput('${id}')">T</span>
              </button>
              <button value="url" data-toolbar="URL"><span id="imageIcon" class="icon"
              onclick="showUrlInput('${id}')">🔗</span>
              </button>
          </div>
          <!-- 入力エリア -->
          <div>
              <input type="text" id="flexTextLabel_${id}" class="flex-label" placeholder="ラベルを入力">
              <textarea id="flex-input-area_${id}" class="input-text-field" maxlength="500" placeholder="テキストを入力"></textarea>
              <!-- URL -->
              <div id="flexUrlContainer" class="input-url-field" style="display: none;">
                  <input type="url" id="flexUrl_${id}" class="flex-url" placeholder="URLを入力">
              </div>
              <button class="removeButton" onclick="removeMessageField('${id}')">❌︎ 削除</button>
          </div>
      </div>
  `;
  container.appendChild(field);

  // 追加された入力フォームに対してボタン制御を適用
  observeFormInputs(field);
}

// 🎨 リッチメッセージ（画像）プレビュー
function previewRichMessage(id) {
  const field = document.getElementById(`imageSelectContainer_${id}`);

  if (!field) {
    console.error('指定された ID のフォームが見つかりません:', id);
    return;
  }

  const fileInput = document.getElementById(`richMessageUpload_${id}`);
  const preview = document.getElementById(`richMessagePreview_${id}`);

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    };

    reader.readAsDataURL(file);
  } else {
    preview.style.display = 'none';
    console.log('ファイルが選択されていません');
  }
}

// 🎥 リッチビデオメッセージ（動画）プレビュー
function previewRichVideo(id) {
  const fileInput = document.getElementById('richVideoUpload_' + id);
  const preview = document.getElementById('richVideoPreview_' + id);

  if (!fileInput || !preview) {
    console.error(`リッチビデオの要素が見つかりません (ID: ${id})`);
    return;
  }

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

// 🎨 リッチメニュー選択変更
function changeRichType() {
  const type = document.getElementById('richMenuSelect').value;
  document.getElementById('imageSelectContainer').style.display =
    type === 'image' ? 'block' : 'none';
  document.getElementById('videoSelectContainer').style.display =
    type === 'video' ? 'block' : 'none';
}

// 差し込みタブの切り替え
function changeCriteriaTab() {
  const type = document.getElementById('criteriaTabSelect').value;
  document.getElementById('criteriaTabTitle').style.display = 'block';
  document.getElementById('schedule').style.display =
    type === 'criteriaTab1' ? 'block' : 'none';
  document.getElementById('salesOrder').style.display =
    type === 'criteriaTab2' ? 'block' : 'none';
}

function sendTextMessage(id) {
  try {
    const field = document.getElementById(id);
    if (!field) {
      console.error(`フィールド "${id}" が見つかりません`);
      return;
    }

    const inputField = field.querySelector('.input-text-field');
    const chatPreview = document.querySelector('.chat-preview');

    if (!chatPreview) {
      console.error('チャットプレビュー要素が見つかりません');
      return;
    }

    // 入力内容を追跡するための変数
    let messageText = inputField?.value?.trim();

    // 各IDに基づいてメッセージの吹き出しを管理
    const existingBubble = chatPreview.querySelector(
      `.message.sent[data-id='${id}']`
    );

    if (messageText) {
      // 既存の吹き出しに内容を追加
      if (existingBubble) {
        existingBubble.textContent = messageText;
      } else {
        // 新しい吹き出しを作成
        const textMessage = document.createElement('div');
        textMessage.className = 'message sent';
        textMessage.textContent = messageText;
        textMessage.setAttribute('data-id', id);
        chatPreview.appendChild(textMessage);
      }
    } else {
      // 文字が消えた場合、吹き出しを削除
      if (existingBubble) {
        existingBubble.remove();
      }
    }

    chatPreview.scrollTo({ top: chatPreview.scrollHeight, behavior: 'smooth' });
  } catch (error) {
    console.error('メッセージ送信中にエラーが発生しました:', error);
  }
}

function sendMessage(id) {
  try {
    const field = document.getElementById(id);
    if (!field) {
      console.error(`フィールド "${id}" が見つかりません`);
      return;
    }

    const inputImgField = field.querySelector('.file-input');
    // const preview = document.getElementById("responceImagePreview");
    const richMessageInput = document.getElementById('richMessageUpload_' + id);
    const richVideoInput = document.getElementById('richVideoUpload_' + id);

    const flexImageInput = document.getElementById('flexImageUpload');
    const flexInputArea = document
      .getElementById(`flex-input-area_${id}`)
      ?.value.trim();
    const flexUrl = document.getElementById(`flexUrl_${id}`)?.value.trim();
    const messageBody = document
      .querySelector('#flexText textarea')
      ?.value.trim();
    const chatPreview = document.querySelector('.chat-preview');

    if (!chatPreview) {
      console.error('チャットプレビュー要素が見つかりません');
      return;
    }

    const messageImg = inputImgField?.files[0];
    const messageSrc = inputImgField?.src;
    const richMessageFile = richMessageInput?.files[0];
    const richVideoFile = richVideoInput?.files[0];
    const flexImageFile = flexImageInput?.files[0];

    // // 画像がある場合の処理
    // if (messageImg) {
    //     const reader = new FileReader();
    //     reader.onload = function (e) {
    //         const imgElement = document.createElement("img");
    //         imgElement.src = e.target.result;
    //         imgElement.className = "image-message";
    //         imgElement.setAttribute('data-id', id);
    //         chatPreview.appendChild(imgElement);
    //     };
    //     reader.readAsDataURL(messageImg);
    // }
    if (messageImg || messageSrc) {
      const imgElement = document.createElement('img');
      imgElement.className = 'image-message';
      imgElement.setAttribute('data-id', id);

      // messageSrc（絶対パスの画像）がある場合は直接設定
      if (messageSrc) {
        imgElement.src = messageSrc;
        imgElement.style.display = 'block';
        chatPreview.appendChild(imgElement);
      }

      // messageImg（ローカルファイル）がある場合は FileReader で読み込む
      if (messageImg) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imgElement.src = e.target.result;
          chatPreview.appendChild(imgElement);
        };
        reader.readAsDataURL(messageImg); // ファイルを DataURL として読み込む
      }
    }

    // リッチメッセージ（画像）を処理
    if (richMessageFile) {
      let existingBubble = chatPreview.querySelector(
        `.rich-message-container[data-id="${id}"]`
      );
      if (!existingBubble) {
        existingBubble = document.createElement('div');
        existingBubble.className = 'rich-message-container';
        existingBubble.setAttribute('data-id', id);
        const imageContainer = document.createElement('div');
        imageContainer.className = 'rich-image-container';
        existingBubble.appendChild(imageContainer);
        chatPreview.appendChild(existingBubble);
      }

      const imageContainer = existingBubble.querySelector(
        '.rich-image-container'
      );
      let richImg = imageContainer.querySelector(
        `.rich-image-preview[data-id="${id}"]`
      );
      if (!richImg) {
        richImg = document.createElement('img');
        richImg.className = 'rich-image-preview';
        richImg.setAttribute('data-id', id);
        imageContainer.appendChild(richImg);
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        richImg.src = e.target.result;
      };
      reader.readAsDataURL(richMessageInput.files[0]);
    }

    // リッチビデオの処理
    if (richVideoFile) {
      let existingBubble = chatPreview.querySelector(
        `.rich-video-message-container[data-id="${id}"]`
      );
      if (!existingBubble) {
        existingBubble = document.createElement('div');
        existingBubble.className = 'rich-video-message-container';
        existingBubble.setAttribute('data-id', id);
        const videoContainer = document.createElement('div');
        videoContainer.className = 'rich-video-container';
        existingBubble.appendChild(videoContainer);
        chatPreview.appendChild(existingBubble);
      }

      const videoContainer = existingBubble.querySelector(
        '.rich-video-container'
      );
      let richVideo = videoContainer.querySelector('.rich-video-preview');
      if (!richVideo) {
        richVideo = document.createElement('video');
        richVideo.className = 'rich-video-preview';
        richVideo.setAttribute('controls', '');
        videoContainer.appendChild(richVideo);
      }

      richVideo.setAttribute('data-id', id);

      const reader = new FileReader();
      reader.onload = function (e) {
        richVideo.src = e.target.result;
      };
      reader.readAsDataURL(richVideoInput.files[0]);
    }

    // 画像ファイル、URL、テキストが入力されている場合にチャットプレビューを更新
    if (flexImageFile || flexUrl || flexInputArea || messageBody) {
      let existingBubble = chatPreview.querySelector('.flex-message-container');

      if (!existingBubble) {
        existingBubble = document.createElement('div');
        existingBubble.className = 'flex-message-container';
        chatPreview.appendChild(existingBubble);
      }

      const imageContainer =
        existingBubble.querySelector('.flex-image-container') ||
        document.createElement('div');
      imageContainer.className = 'flex-image-container';

      const textContainer =
        existingBubble.querySelector('.flex-text-container') ||
        document.createElement('div');
      textContainer.className = 'flex-text-container';

      existingBubble.appendChild(imageContainer);
      existingBubble.appendChild(textContainer);

      // 画像を更新
      if (flexImageInput.files.length > 0) {
        let flexImg =
          imageContainer.querySelector('.flex-image-preview') ||
          document.createElement('img');
        flexImg.className = 'flex-image-preview';
        imageContainer.appendChild(flexImg);

        flexImg.setAttribute('alt', 'フレックス画像');

        const reader = new FileReader();
        reader.onload = function (e) {
          flexImg.src = e.target.result;
        };
        reader.readAsDataURL(flexImageInput.files[0]);
      }

      // messageBodyを更新
      if (messageBody) {
        let messageParagraph =
          textContainer.querySelector('.flex-message-body') ||
          document.createElement('p');
        messageParagraph.className = 'flex-message-body';
        textContainer.appendChild(messageParagraph);
        messageParagraph.textContent = messageBody;
      }

      // ラベルの処理（IDごとに管理）
      let labelContainer =
        textContainer.querySelector('.flex-label-container') ||
        document.createElement('div');
      labelContainer.className = 'flex-label-container';
      textContainer.appendChild(labelContainer);

      // まずラベルをクリア
      labelContainer.innerHTML = '';

      const flexTextLabel = document
        .getElementById(`flexTextLabel_${id}`)
        ?.value.trim();
      if (flexTextLabel) {
        let existingLabel = labelContainer.querySelector(
          `[data-label-id='${id}']`
        );
        if (existingLabel) {
          existingLabel.textContent = flexTextLabel; // 同じIDなら上書き
        } else {
          let newLabel = document.createElement('p');
          newLabel.className = 'flex-message-label';
          newLabel.setAttribute('data-label-id', id);
          newLabel.textContent = flexTextLabel;
          labelContainer.appendChild(newLabel);
        }
      }

      // URLを更新
      if (flexUrl) {
        let displayElement =
          textContainer.querySelector('.flex-url-display') ||
          document.createElement('p');
        displayElement.className = 'flex-url-display';
        textContainer.appendChild(displayElement);

        let link =
          displayElement.querySelector('a') || document.createElement('a');
        link.className = 'flex-url-link';
        link.target = '_blank';
        displayElement.appendChild(link);

        link.href = flexUrl;
        link.textContent = flexTextLabel || 'リンク'; // URLにラベルを付ける（flexTextLabelがあればそれを使用）

        // URLが入力された場合、テキストラベルをクリア
        labelContainer.innerHTML = ''; // テキストラベルを消去
      }
    }

    chatPreview.scrollTo({ top: chatPreview.scrollHeight, behavior: 'smooth' });
  } catch (error) {
    console.error('メッセージ送信中にエラーが発生しました:', error);
  }
}

// 配信リストの作成
function createDeliveryList() {
  const CreateDeliveryListContainer =
    document.getElementById('CreateDeliveryList');
  document.getElementById('DeliveryListList').style.display = 'none';
  CreateDeliveryListContainer.style.display = 'block';
  CreateDeliveryListContainer.innerHTML = '';
  CreateDeliveryListContainer.innerHTML = `
          <div class="form-group">
              <h2>配信リストを作成</h2>
              <h3 class="required">リスト名</h3>
              <input type="text" id="listName" required>
              <h3>送信日時</h3>
              <input type="datetime-local" id="ListSendDateTime" >
              <h3>テンプレート</h3>
              <select id="ListSendTemplateSelect">
                  <option value="" hidden>-選択してください-</option>
                  <option value="ListSendTemplate1">テストテンプレート</option>
              </select>
              <h3>備考</h3>
              <textarea id="distributionListNote" placeholder="備考を入力" maxlength="500"></textarea>
          </div>
          <!-- ボタンエリア -->
          <div class="button-group">
              <button id="momeryButton" onclick="createDistributionList()">💾 保存</button>
              <button id="resetButton" onclick="createDeliveryList()" style="dispkay:none;>リセット</button>
          </div>
      `;
}

// // 送信履歴の作成
// function CreateTransmissionHistory() {
//     const CreateTransmissionHistoryContainer = document.getElementById("CreateTransmissionHistory");
//     document.getElementById("transmissionHistoryContainer").style.display = 'none';
//     CreateTransmissionHistoryContainer.style.display = 'block';
//     CreateTransmissionHistoryContainer.innerHTML = '';
//     CreateTransmissionHistoryContainer.innerHTML = `
//             <div class="form-group">
//                 <h2>送信履歴の作成</h2>
//                 <h3>テンプレート</h3>
//                 <select id="transmissionHistoryTemplateSelect">
//                     <option value="" hidden>-選択してください-</option>
//                     <option value="transmissionHistoryTemplate1">テストテンプレート</option>
//                 </select>
//                 <h3>送信日時</h3>
//                 <input type="datetime-local" id="transmissionHistoryDateTime" >
//                 <h3>一時保存(送信対象)</h3>
//                 <textarea id="temporarilySaved" placeholder="一時保存(送信対象)を入力" maxlength="500"></textarea>
//                 <h3>送信URL</h3>
//                 <div id="addTransmissionHistoryFields"></div>
//             </div>
//             <button class="addMessageButton" onclick="addTransmissionHistoryField()">➕︎ メッセージを追加</button>
//             <!-- ボタンエリア -->
//             <div class="button-group">
//                 <button id="momeryButton" onclick="createDistributionList()">💾 保存</button>
//                 <button id="resetButton" onclick="CreateTransmissionHistory()" style="dispkay:none;>リセット</button>
//             </div>
//         `;
// }

// // 送信履歴追加行（URL）
// function addTransmissionHistoryField() {
//     let tableContainer = document.getElementById("dynamicHistoryTableContainer");

//     // 最初の追加時に新しいテーブルを作成
//     if (!tableContainer) {
//         tableContainer = document.createElement("div");
//         tableContainer.setAttribute("id", "dynamicHistoryTableContainer");
//         document.getElementById("addTransmissionHistoryFields").appendChild(tableContainer);

//         const table = document.createElement("table");
//         table.setAttribute("id", "dynamicHistoryTable");
//         table.classList.add("design04");

//         table.innerHTML = `
//             <thead>
//                 <tr>
//                     <th>URL</th>
//                     <th class="deleteColumn"></th>
//                 </tr>
//             </thead>
//             <tbody></tbody>
//         `;

//         tableContainer.appendChild(table);
//     }

//     const tableBody = document.querySelector("#dynamicHistoryTable tbody"); // 新しく作成したテーブルのtbody
//     const id = `row_${Date.now()}`; // 行のユニークID

//     const row = document.createElement("tr");
//     row.setAttribute("id", id);

//     row.innerHTML = `
//         <td>
//             <input type="text" name="historyTableRow" + "_" + ${id} id="historyTableRow" + "_" + ${id} placeholder="URLを入力">
//         </td>
//         <td>
//             <button class="removeRowButton" onclick="removeMessageRow('${id}')">❌︎</button>
//         </td>
//     `;

//     tableBody.appendChild(row);
// }

// プラスボタンが押された時の処理
function CreateResponseMessage() {
  // 「応答メッセージ」コンテナを非表示にし、「CreateResponseMessage」コンテナを表示
  const CreateResponseMessageContainer = document.getElementById(
    'CreateResponseMessage'
  );
  const responseMessageContainer = document.getElementById(
    'responseMessageContainer'
  );
  const responseMessage = document.getElementById('responseMessage');

  responseMessageContainer.style.display = 'none'; // 「応答メッセージ」を非表示
  CreateResponseMessageContainer.style.display = 'block'; // 「応答メッセージ作成」フォームを表示
  responseMessage.style.display = 'block'; // 親要素を表示

  // HTMLコンテンツの挿入
  CreateResponseMessageContainer.innerHTML = `
      <div class="form-group">
          <h2>応答メッセージを作成</h2>
          <h3 class="required">タイトル</h3>
          <input type="text" id="RresponseMessageTitle" required>
          <h3>キーワード</h3>
          <input type="text" id="RresponseMessageKeyWord">
          <h3 class="required">マッチ方法</h3>
          <select id="matchType" required>
              <option value="">-選択してください-</option>
              <option value="exactMatch">完全一致</option>
              <option value="partialMatch">部分一致</option>
          </select>
          <h3>メッセージタイプ</h3>
          <select id="responseMessagetype" onchange="changeResponseMessagetype()">
              <option value="">-選択してください-</option>
              <option value="responceText">テキスト</option>
              <option value="responceImg">画像</option>
          </select>
          <div id="responceTextArea" style="display: none;">
              <textarea id="responceTextMessage" class="input-text-field" maxlength="500" placeholder="テキストを入力" onkeyup="textCountor('responceTextArea'); sendTextMessage('responceTextArea');"></textarea>
              <div class="footer">
                  <span id="char-counter" class="char-counter">0/500</span>
              </div>
          </div>
          <div id="responceImgArea" style="display: none;">
              <div class="custom-file-upload">
                  <input type="file" id="responceImgUpload" accept="image/*"
                      onchange="previewResponceImage(); sendMessage('responceImgArea');" class="file-input">
                  <label for="responceImgUpload" id="uploadLabel">
                      <span class="upload-text">🖿 写真をアップロード</span>
                      <img id="responceImagePreview" class="image-preview" style="display: none;">
                  </label>
              </div>
          </div>
      </div>
      <div class="button-group">
          <button id="momeryButton" onclick="createDistributionList()">💾 保存</button>
          <button id="resetButton" onclick="CreateResponseMessage()" style="dispkay:none;>リセット</button>
      </div>
  `;
}

function previewResponceImage() {
  const file = document.getElementById('responceImgUpload').files[0];
  const src = document.getElementById('responceImgUpload').src;
  const preview = document.getElementById('responceImagePreview');

  if (file || src) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
      // imgIcon.style.display = "none";
    };
    if (!file && src) {
      // src が絶対パスの場合、直接設定
      preview.src = src;
      preview.style.display = 'block';
    } else if (file) {
      reader.readAsDataURL(file); // ローカルファイルを読み込む
    }
  }
}

function changeResponseMessagetype() {
  const type = document.getElementById('responseMessagetype').value;
  document.getElementById('responceTextArea').style.display =
    type === 'responceText' ? 'block' : 'none';
  document.getElementById('responceImgArea').style.display =
    type === 'responceImg' ? 'block' : 'none';
}

// メッセージの編集
function editMessage(id) {
  const fieldId = `message_${Date.now()}`;
  const field = document.getElementById(id);
  const fieldGrandParent = field.parentElement.parentElement;
  const messageType = fieldGrandParent.id;
  const textContent = field.textContent;
  console.log(textContent);

  if (messageType === 'greetingMessageContainer') {
    const greetingMessage = document.getElementById('greetingMessage');
    const container = document.getElementById('CreateGreetingMessage');

    // greetingMessageを表示
    greetingMessage.style.display = 'block';

    const field = document.createElement('div');
    field.classList.add('greeting-message-field');

    field.innerHTML = `
              <div class="input-container" id="${fieldId}">
              <!-- 入力エリア -->
              <textarea  id='${id}' class="input-text-field" maxlength="500" placeholder="テキストを入力" onkeyup="textCountor('${fieldId}'); sendTextMessage('${fieldId}');">${textContent}</textarea>
              <!-- ボタンエリア -->
              <div class="button-group">
                  <button id="momeryButton" onclick="createDistributionList()">💾 保存</button>
                  <button id="resetButton" onclick="CreateMessagee()" style="dispkay:none;>リセット</button>
              </div>
              <div class="footer">
                  <span id="char-counter" class="char-counter">0/500</span>
              </div>
      `;
    container.appendChild(field);
    // greetingMessageContainerを非表示
    document.getElementById('greetingMessageContainer').style.display = 'none';

    // CreateGreetingMessageを表示
    container.style.display = 'block';
  } else {
    // AfterHours Messageの処理
    const afterHoursMessage = document.getElementById('AfterHoursMessage');
    const container = document.getElementById('CreateAfterHoursMessage');

    afterHoursMessage.style.display = 'block';

    const field = document.createElement('div');
    field.classList.add('message-field');

    field.innerHTML = `
              <div class="input-container" id="${fieldId}">
              <!-- 入力エリア -->
              <textarea  id='${id}' class="input-text-field" maxlength="500" placeholder="テキストを入力" onkeyup="textCountor('${fieldId}'); sendTextMessage('${fieldId}');">${textContent}</textarea>
              <!-- ボタンエリア -->
              <div class="button-group">
                  <button id="momeryButton" onclick="createDistributionList()">💾 保存</button>
                  <button id="resetButton" onclick="CreateMessagee()" style="dispkay:none;>リセット</button>
              </div>
              <div class="footer">
                  <span id="char-counter" class="char-counter">0/500</span>
              </div>
      `;
    container.appendChild(field);

    // AfterHoursMessageContainerを非表示にして、CreateAfterHoursMessageを表示
    document.getElementById('afterHoursMessageContainer').style.display =
      'none';
    const CreateAfterHoursMessageeContainer = document.getElementById(
      'CreateAfterHoursMessage'
    );
    CreateAfterHoursMessageeContainer.style.display = 'block';
  }
}

function CreateMessagee(element) {
  const id = `message_${Date.now()}`;

  if (element.id === 'createGreetingMessageButton') {
    // greetingMessageを表示してからCreateGreetingMessageを表示
    const greetingMessage = document.getElementById('greetingMessage');
    const container = document.getElementById('CreateGreetingMessage');

    // greetingMessageを表示
    greetingMessage.style.display = 'block';

    // CreateGreetingMessageのフィールドを作成
    const field = document.createElement('div');
    field.classList.add('greeting-message-field');

    field.innerHTML = `
      <div class="input-container" id="${id}">
      <!-- 入力エリア -->
      <textarea class="input-text-field" maxlength="500" placeholder="テキストを入力" onkeyup="textCountor('${id}'); sendTextMessage('${id}');"></textarea>
      <!-- ボタンエリア -->
      <div class="button-group">
          <button id="momeryButton" onclick="createDistributionList()">💾 保存</button>
          <button id="resetButton" onclick="CreateMessagee()" style="dispkay:none;>リセット</button>
      </div>
      <div class="footer">
          <span id="char-counter" class="char-counter">0/500</span>
      </div>
  `;

    container.appendChild(field);

    // greetingMessageContainerを非表示
    document.getElementById('greetingMessageContainer').style.display = 'none';

    // CreateGreetingMessageを表示
    container.style.display = 'block';
  } else {
    // AfterHours Messageの処理
    const afterHoursMessage = document.getElementById('AfterHoursMessage');
    const container = document.getElementById('CreateAfterHoursMessage');

    afterHoursMessage.style.display = 'block';

    const field = document.createElement('div');
    field.classList.add('message-field');

    field.innerHTML = `
          <div class="input-container" id="${id}">
              <!-- 入力エリア -->
              <textarea id="fieldId" class="input-text-field" maxlength="500" placeholder="テキストを入力" onkeyup="textCountor('${id}'); sendTextMessage('${id}');"></textarea>
              <!-- ボタンエリア -->
              <div class="button-group">
                  <button id="momeryButton" onclick="createDistributionList()">💾 保存</button>
                  <button id="resetButton" onclick="CreateMessagee(this)" style="dispkay:none;">リセット</button>
              </div>
              <div class="footer">
                  <span id="char-counter" class="char-counter">0/500</span>
              </div>
      `;
    container.appendChild(field);

    // AfterHoursMessageContainerを非表示にして、CreateAfterHoursMessageを表示
    document.getElementById('afterHoursMessageContainer').style.display =
      'none';
    const CreateAfterHoursMessageeContainer = document.getElementById(
      'CreateAfterHoursMessage'
    );
    CreateAfterHoursMessageeContainer.style.display = 'block';
  }
}

function CreateWorkFlowMessage() {
  const CreateTransmissionHistoryContainer = document.getElementById(
    'CreateWorkFlowMessage'
  );
  document.getElementById('workFlowMessageContainer').style.display = 'none';
  CreateTransmissionHistoryContainer.style.display = 'block';
  CreateTransmissionHistoryContainer.innerHTML = '';
  CreateTransmissionHistoryContainer.innerHTML = `
          <div class="form-group">
              <h2>ワークフロー配信の作成</h2>
              <h3 class="required">基準タブ</h3>
              <select id="workFlowCriteriaTab" required>
                  <option value="" hidden>-選択してください-</option>
                  <option value="workFlowCriteriaTab1">商談</option>
              </select>
              <h3 class="required">日時項目</h3>
              <select id="workFloeDateTimeField" required>
                  <option value="" hidden>-選択してください-</option>
                  <option value="workFloeDateTimeField1">モニター日</option>
              </select>
              <h3>送信日</h3>
              <input type="radio" name="executionDate" value="sameTime" onchange="handleExecutionDateChange('sameTime')" checked> 当日（同時刻）
              <input type="radio" name="executionDate" value="customTime" onchange="handleExecutionDateChange('customTime')"> 当日（カスタム）
              <input type="radio" name="executionDate" value="specifiedDay" onchange="handleExecutionDateChange('specifiedDay')"> 指定日
              <div id="timinguConteiner">
                  <h3>タイミング</h3>
                  <input type="number" id="timiongDay" name="timing" value="timing" placeholder = "例: 3（3日前） or 5（5日後）">
                  <input type="number" id="timiongDay" name="timing" value="timing" placeholder = "例: -3（3日前） or 5（5日後）" style="display:none;">
                  <select id="dayBeforeAfter">
                      <option value="" hidden>-選択してください-</option>
                      <option value="dayBefore">日前</option>
                      <option value="dayAfter">日後</option>
                  </select>
              </div>
              <div id="executionTimeConteiner">
                  <h3>送信時刻</h3>
                  <input type="time" id="executionTime" >
              </div>
              <h3 class="required">テンプレート</h3>
              <select id="workFlowTemplateSelect" required>
                  <option value="" hidden>-選択してください-</option>
                  <option value="workFlowTemplateSelect1">テストテンプレート</option>
              </select>
              <h3>繰り返し</h3>
              <select id="workFlowRepetition">
                  <option value="" hidden>-選択してください-</option>
                  <option value="workFlowRepetition1">一度のみ</option>
                  <option value="workFlowRepetition2">毎月</option>
                  <option value="workFlowRepetition3">毎年</option>
              </select>
              <h3>送信条件
                  <div class="tooltip-container">
                      <!-- アイコン部分 -->
                      <span class="tooltip-icon">i</span>
                      
                      <!-- ツールチップ部分 -->
                      <div class="tooltip">
                          これはツールチップのテキストです。情報を提供します。
                      </div>
                  </div>
              </h3>
              <div id="addWorkFlowFields"></div>
              <button class="addMessageButton" onclick="addWorkFlowMessageFields()">➕︎ メッセージを追加</button>
          </div>
          <!-- ボタンエリア -->
          <div class="button-group">
              <button id="momeryButton" onclick="createDistributionList()">💾 保存</button>
              <button id="resetButton" onclick="CreateWorkFlowMessage()" style="dispkay:none;>リセット</button>
          </div>
      `;
  handleExecutionDateChange('sameTime');
}

function addWorkFlowMessageFields() {
  let tableContainer = document.getElementById('dynamicWorkFlowTableContainer');

  // 最初の追加時に新しいテーブルを作成
  if (!tableContainer) {
    tableContainer = document.createElement('div');
    tableContainer.setAttribute('id', 'dynamicWorkFlowTableContainer');
    document.getElementById('addWorkFlowFields').appendChild(tableContainer);

    const table = document.createElement('table');
    table.setAttribute('id', 'dynamicWorkFlowTable');
    table.classList.add('design04');

    table.innerHTML = `
          <thead>
              <tr>
                  <th>項目</th>
                  <th>演算子</th>
                  <th>条件</th>
                  <th class="deleteColumn"></th>
              </tr>
          </thead>
          <tbody></tbody>
      `;

    tableContainer.appendChild(table);
  }

  const tableBody = document.querySelector('#dynamicWorkFlowTable tbody'); // 新しく作成したテーブルのtbody
  const id = `row_${Date.now()}`; // 行のユニークID

  const row = document.createElement('tr');
  row.setAttribute('id', id);

  row.innerHTML = `
      <td>
          <select>
              <option value="" hidden>-選択してください-</option>
              <option value="workFlowRepetition1">撮影内容</option>
          </select>
      </td>
      <td>
          <select>
              <option value="" hidden>-選択してください-</option>
              <option value="workFlowRepetition1">次の値を含まない</option>
          </select>
      </td>
      <td>
          <select>
              <option value="" hidden>-選択してください-</option>
              <option value="workFlowRepetition1">卒入園・入学</option>
          </select>
      </td>
      <td>
          <button class="removeRowButton" onclick="removeMessageRow('${id}')">❌︎</button>
      </td>
  `;

  tableBody.appendChild(row);
}

// 指定した行を削除する関数
function removeMessageRow(id) {
  const row = document.getElementById(id);
  if (row) {
    row.remove();
  }

  // すべての行が削除されたら、テーブル自体も削除
  const tableBody = document.querySelector('#dynamicTable tbody');
  if (tableBody && tableBody.children.length === 0) {
    document.getElementById('dynamicTableContainer').remove();
  }
}

document.addEventListener('DOMContentLoaded', function () {
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
});

// ボタンの無効化処理
function toggleButtonState(field) {
  // 各入力フィールドを取得
  const textArea = field.querySelector('.input-text-field');
  const imageUploadInput = field.querySelector(
    '.input-image-field .file-input'
  );
  const richMessageUploadInput = field.querySelector(
    '.imageSelectContainer .file-input'
  );
  const richVideoUploadInput = field.querySelector(
    '.videoSelectContainer .file-input'
  );

  // フレックスメッセージの追加フィールド用の要素取得
  const flexTextArea = field.querySelector(
    '.flex-message-field .input-text-field'
  );
  const flexUrlInput = field.querySelector('.flex-message-field .flex-url');

  // ツールバーのボタンを取得
  const buttons = field.querySelectorAll('.toolbar button');

  // 入力があればボタンを無効化するフラグ
  let isInputFilled = false;

  // 入力内容をチェック
  if (textArea && textArea.value.trim() !== '') {
    isInputFilled = true;
  } else if (imageUploadInput && imageUploadInput.files.length > 0) {
    isInputFilled = true;
  } else if (
    richMessageUploadInput &&
    richMessageUploadInput.files.length > 0
  ) {
    isInputFilled = true;
  } else if (richVideoUploadInput && richVideoUploadInput.files.length > 0) {
    isInputFilled = true;
  } else if (flexTextArea && flexTextArea.value.trim() !== '') {
    isInputFilled = true;
  } else if (flexUrlInput && flexUrlInput.value.trim() !== '') {
    isInputFilled = true;
  } else {
    console.log('入力なし');
  }

  // 入力がある場合、ボタンを無効化
  buttons.forEach((button) => {
    if (isInputFilled) {
      button.disabled = true; // 入力があるときはボタンを無効化
      button.style.pointerEvents = 'none'; // クリック無効化
    } else {
      button.disabled = false; // 入力がないときはボタンを有効化
      button.style.pointerEvents = 'auto'; // クリック有効化
    }
  });

  console.log('ボタンの無効化処理が完了');
}

// 入力フォームに対してイベントリスナーを追加
function observeFormInputs(field) {
  // テキストエリアの入力を監視
  const textArea = field.querySelector('.input-text-field');
  const imageUploadInput = field.querySelector(
    '.input-image-field .file-input'
  );
  const richMessageUploadInput = field.querySelector(
    '.imageSelectContainer .file-input'
  );
  const richVideoUploadInput = field.querySelector(
    '.videoSelectContainer .file-input'
  );

  // フレックスメッセージの入力を監視
  const flexTextArea = field.querySelector(
    '.flex-message-field .input-text-field'
  );
  const flexUrlInput = field.querySelector('.flex-message-field .flex-url');

  if (textArea) {
    textArea.addEventListener('input', () => {
      toggleButtonState(field);
    });
  }

  if (imageUploadInput) {
    imageUploadInput.addEventListener('change', () => {
      toggleButtonState(field);
    });
  }

  if (richMessageUploadInput) {
    richMessageUploadInput.addEventListener('change', () => {
      toggleButtonState(field);
    });
  }

  if (richVideoUploadInput) {
    richVideoUploadInput.addEventListener('change', () => {
      toggleButtonState(field);
    });
  }

  if (flexTextArea) {
    flexTextArea.addEventListener('input', () => {
      toggleButtonState(field);
    });
  }

  if (flexUrlInput) {
    flexUrlInput.addEventListener('input', () => {
      toggleButtonState(field);
    });
  }

  // 最初の状態をチェック
  toggleButtonState(field);
}

function sortTable(columnIndex, tableId) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.getElementsByTagName('tr'));
  let ascending = table.dataset.ascending !== 'true';

  rows.sort((a, b) => {
    const cellA = a.cells[columnIndex].textContent.trim();
    const cellB = b.cells[columnIndex].textContent.trim();
    return ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
  });

  rows.forEach((row) => tbody.appendChild(row)); // 並び替えた行を再配置
  table.dataset.ascending = ascending; // ソートの順序を保存
}

// ワークフローの入力フォーム制御
function handleExecutionDateChange(selectedValue) {
  var executionTime = document.getElementById('executionTimeConteiner');
  var executionDateRadios = document.getElementsByName('executionDate');
  var dateOffsetContainer = document.getElementById('timinguConteiner');

  // 条件ごとの表示・非表示の処理
  if (selectedValue === 'sameTime') {
    executionTime.style.display = 'none';
    dateOffsetContainer.style.display = 'none';
  } else if (selectedValue === 'customTime') {
    executionTime.style.display = 'block';
    dateOffsetContainer.style.display = 'none';
  } else if (selectedValue === 'specifiedDay') {
    executionTime.style.display = 'block';
    dateOffsetContainer.style.display = 'block';
  }
}

function DeliveryListRowClickHandler(row) {
  const cells = row.getElementsByTagName('td');
  const sendDateTime = cells[1]?.innerText.trim() || '未取得'; // 送信日時
  const templateText = cells[0]?.innerText.trim() || '未取得'; // テンプレート名

  // まず、作成画面を生成
  createDeliveryList();

  // 100ms 待ってから要素を取得
  setTimeout(() => {
    const sendDateTimeInput = document.getElementById('ListSendDateTime');
    const templateSelect = document.getElementById('ListSendTemplateSelect');
    const noteTextArea = document.getElementById('distributionListNote');

    if (!sendDateTimeInput || !templateSelect || !noteTextArea) {
      console.error('❌ フォーム要素が取得できません。IDを確認してください。');
      return;
    }

    // フォームにデータをセット
    setFormValues(
      sendDateTimeInput,
      templateSelect,
      noteTextArea,
      sendDateTime,
      templateText
    );
  }, 100);
}

// フォームにデータをセットする関数
function setFormValues(
  sendDateTimeInput,
  templateSelect,
  noteTextArea,
  sendDateTime,
  templateText
) {
  sendDateTimeInput.value = formatDateTime(sendDateTime);
  noteTextArea.value = templateText;

  let templateFound = false;
  for (let option of templateSelect.options) {
    if (option.text.trim() === templateText) {
      option.selected = true;
      templateFound = true;
      console.log('🎯 一致するテンプレートを選択:', option.value);
      break;
    }
  }
  if (!templateFound) {
    console.warn(
      '⚠️ テンプレートがセレクトボックス内で見つかりません:',
      templateText
    );
  }
}

// 日時のフォーマットを適切に変換する関数
function formatDateTime(dateTimeStr) {
  const dateObj = new Date(dateTimeStr.replace(/\//g, '-'));
  if (isNaN(dateObj)) {
    console.error('❌ 無効な日付フォーマット:', dateTimeStr);
    return '';
  }

  const formattedDate = dateObj.toISOString().slice(0, 16);
  console.log('✅ 変換後の日時:', formattedDate);

  return formattedDate;
}

function WorkFlowRowClickHandler(row) {
  if (!row) {
    console.error('❌ [WorkFlow] 無効な行がクリックされました。');
    return;
  }

  const cells = row.getElementsByTagName('td');
  if (cells.length < 5) {
    console.error(
      '❌ [WorkFlow] セル数が不足しています。正しいテーブル構造か確認してください。'
    );
    return;
  }

  // 各項目の取得（適切なカラム番号を設定してください）
  // const criteriaTab = cells[0]?.innerText.trim() || ""; // 基準タブ
  const dateTimeField = cells[0]?.innerText.trim() || ''; // 日時項目
  let executionType = cells[1]?.innerText.trim() || ''; // 送信日タイプ
  const timing = cells[2]?.innerText.trim() || ''; // 何日前
  const sendTime = cells[3]?.innerText.trim() || ''; // 送信時刻
  const templateText = cells[4]?.innerText.trim() || ''; // テンプレート名
  const repetition = cells[6]?.innerText.trim() || ''; // 繰り返し

  // ワークフロー配信フォームの表示
  const workFlowContainer = document.getElementById('workFlowMessageContainer');
  const createWorkFlowContainer = document.getElementById(
    'CreateWorkFlowMessage'
  );

  if (!workFlowContainer || !createWorkFlowContainer) {
    console.error('❌ [WorkFlow] 必要なコンテナが見つかりません。');
    return;
  }

  CreateWorkFlowMessage();
  addWorkFlowMessageFields();
  handleExecutionDateChange();

  setTimeout(() => {
    // 各フォーム要素を取得
    // const criteriaTabSelect = document.getElementById("workFlowCriteriaTab");
    const dateTimeFieldSelect = document.getElementById(
      'workFloeDateTimeField'
    );
    const executionRadios = document.getElementsByName('executionDate');
    const timiongDay = document.getElementById('timiongDay');
    const timingSelect = document.getElementById('dayBeforeAfter');
    const sendTimeInput = document.getElementById('executionTime');
    const templateSelect = document.getElementById('workFlowTemplateSelect');
    const repetitionSelect = document.getElementById('workFlowRepetition');

    // 基準タブの選択
    // selectOptionByText(criteriaTabSelect, criteriaTab);

    // 日時項目の選択
    selectOptionByText(dateTimeFieldSelect, dateTimeField);

    if (executionType === '当日（同時刻）') {
      executionType = 'sameTime';
    } else if (executionType === '当日（カスタム）') {
      executionType = 'customTime';
    } else {
      executionType = 'specifiedDay';
    }

    // 送信日ラジオボタンの選択
    for (let radio of executionRadios) {
      if (radio.value === executionType) {
        radio.checked = true;
        handleExecutionDateChange(executionType); // 表示の切り替えを適用
        break;
      }
    }

    // 日前or日後の判別
    let lastTwoChars = timing.slice(-2); // 文字列の最後2文字を取得
    let remainingNumber = timing.slice(0, -2);
    remainingNumber = remainingNumber; // 残りの文字列（最後2文字を除く）

    timiongDay.value = remainingNumber;
    selectOptionByText(timingSelect, lastTwoChars);

    // 送信時間の設定
    sendTimeInput.value = formatTime(sendTime) || '';

    // テンプレートの選択
    selectOptionByText(templateSelect, templateText);

    // 繰り返しの選択
    selectOptionByText(repetitionSelect, repetition);
  }, 100);
}

// 指定の <select> 内でテキストと一致するオプションを選択
function selectOptionByText(selectElement, text) {
  if (!selectElement) return;
  let optionFound = false;
  for (let option of selectElement.options) {
    if (option.text.trim() === text) {
      option.selected = true;
      optionFound = true;
      break;
    }
  }
  if (!optionFound) {
    console.warn(
      `⚠️ [WorkFlow] ${text} に一致するオプションが見つかりません (${selectElement.id})`
    );
  }
}

// 時刻フォーマット関数（適宜カスタマイズ可能）
function formatTime(timeStr) {
  if (!timeStr || timeStr === '未取得') return '';

  const timeParts = timeStr.match(/^(\d{1,2}):(\d{2})$/);
  if (!timeParts) {
    console.error('❌ [WorkFlow] 無効な時刻フォーマット:', timeStr);
    return '';
  }

  let hours = parseInt(timeParts[1], 10);
  let minutes = timeParts[2];

  hours = hours < 10 ? '0' + hours : hours; // 2桁補正
  return `${hours}:${minutes}`;
}

function responceRowClickHandler(row) {
  if (!row) {
    console.error('❌ [WorkFlow] 無効な行がクリックされました。');
    return;
  }

  const cells = row.getElementsByTagName('td');
  if (cells.length < 4) {
    // 必要なカラム数（4つ）を確認
    console.error(
      '❌ セル数が不足しています。正しいテーブル構造か確認してください。'
    );
    return;
  }

  // 各項目の取得（適切なカラム番号を設定）
  const title = cells[0]?.innerText.trim() || ''; // タイトル
  const keyword = cells[1]?.innerText.trim() || ''; // キーワード
  const matchMethod = cells[2]?.innerText.trim() || ''; // マッチ方法
  const messageContent =
    cells[3]?.innerText.trim() || cells[3]?.querySelector('img')?.src || ''; // メッセージ（テキストまたは画像）

  receiveMenu('CreateResponseMessage');
  CreateResponseMessage();

  setTimeout(() => {
    // 各フォーム要素を取得
    const responceTitle = document.getElementById('RresponseMessageTitle'); // タイトル
    const responseKeyWord = document.getElementById('RresponseMessageKeyWord'); // キーワード
    const matchType = document.getElementById('matchType'); // マッチ方法
    const responceMessageType = document.getElementById('responseMessagetype'); // メッセージタイプ
    const responceTextArea = document.getElementById('responceTextMessage'); // メッセージ（テキスト）
    const responceImgArea = document.getElementById('responceImgUpload'); // メッセージ（画像）

    // タイトル
    responceTitle.value = title;

    // キーワード
    responseKeyWord.value = keyword;

    // マッチ方法
    selectOptionByText(matchType, matchMethod);

    // メッセージの種類の判別
    if (messageContent) {
    }
    if (messageContent.startsWith('file://')) {
      responceMessageType.value = 'responceImg';

      const lastSlashIndex = messageContent.lastIndexOf('/');
      const partAfterLastSlash =
        lastSlashIndex !== -1
          ? messageContent.substring(lastSlashIndex + 1)
          : messageContent;
      const filePath = './img/' + partAfterLastSlash;

      document.getElementById('responceTextArea').style.display = 'none';
      document.getElementById('responceImgArea').style.display = 'block';
      responceImgArea.src = filePath;

      previewResponceImage();
      sendMessage('responceImgArea');
    } else {
      responceMessageType.value = 'responceText';

      document.getElementById('responceTextArea').style.display = 'block';
      document.getElementById('responceImgArea').style.display = 'none';

      responceTextArea.value = messageContent;
      sendTextMessage('responceTextArea');
      textCountor('responceTextArea');
    }
  }, 100);
}

// document.addEventListener("DOMContentLoaded", function () {
//     const templateLinks = document.querySelectorAll("#massSendingTable tbody a");

//     templateLinks.forEach(link => {
//         link.addEventListener("click", function (event) {
//             event.preventDefault(); // デフォルトのリンク動作を無効化

//             const row = this.closest("tr");
//             const messageType = row.children[1].textContent.trim(); // メッセージ種別を取得

//             let editUrl = "edit.html"; // 編集画面のベースURL
//             if (messageType === "通常メッセージ") {
//                 editUrl += "?type=normal";
//             } else if (messageType === "フレックスメッセージ") {
//                 editUrl += "?type=flex";
//             } else if (messageType === "ワークフロー送信") {
//                 editUrl += "?type=remind";
//             }

//             // 遷移する
//             window.location.href = editUrl;
//         });
//     });
// });

// ページが読み込まれた後に URL パラメータをチェックして、メッセージタイプに応じたセクションを表示
document.addEventListener('DOMContentLoaded', function () {
  // URL パラメータを取得
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  console.log(type);

  // すべてのメッセージ入力フォームを非表示にする
  document.getElementById('normalMessageContainer').style.display = 'none';
  document.getElementById('flexMessageContainer').style.display = 'none';
  document.getElementById('remindeContainer').style.display = 'none';

  // URLの `type` に応じて表示を切り替え
  if (type === 'normal') {
    document.getElementById('normalMessageContainer').style.display = 'block';
    document.getElementById('messageTypeSelect').value = 'normal';
  } else if (type === 'flex') {
    document.getElementById('flexMessageContainer').style.display = 'block';
    document.getElementById('messageTypeSelect').value = 'flex';
  } else if (type === 'remind') {
    document.getElementById('remindeContainer').style.display = 'block';
    document.getElementById('messageTypeSelect').value = 'remind';
  }
  // changeMessageType();
});

// データのサンプル
const chatData = [
  {
    id: 1,
    image: './img/img0.png',
    name: '山田 太郎',
    company: '株式会社テクノロジー',
    post: 'マーケティング部門 部長',
    Email: 'yamada.t@company.com',
    Phone: '090-1234-5678',
    address: '東京都渋谷区',
  },
  {
    id: 2,
    image: './img/img1.png',
    name: '佐藤 花子',
    company: '株式会社グローバルテック',
    post: 'マーケティング部門 部長',
    Email: 'sato.h@company.com',
    Phone: '090-1234-5678',
    address: '東京都港区',
  },
  {
    id: 3,
    image: './img/img2.png',
    name: '鈴木 一郎',
    company: '株式会社ネクストイノベーション',
    post: '代表取締役CEO',
    Email: 'suziki.i@company.com',
    Phone: '090-1234-5678',
    address: '東京都渋谷区',
  },
];

// チャットリストアイテムのクリックイベント処理
function handleChatClick(event) {
  console.log(event);
  // クリックされたアイテムのIDを取得
  const chatId = event.target
    .closest('.chat-item')
    .getAttribute('data-chat-id');
  console.log(chatId);

  // 該当するデータを検索
  const chatDetail = chatData.find((chat) => chat.id == chatId);
  console.log(chatDetail);

  // 該当するデータが見つかったら、詳細を表示
  if (chatDetail) {
    displayChatDetail(chatDetail);
  }
}

// チャット詳細を表示する関数
function displayChatDetail(chat) {
  document.getElementById('CRMAvatar').src = `${chat.image}`;
  document.getElementById('CRMName').textContent = `${chat.name}`;
  document.getElementById('CRMCompany').textContent = `${chat.company}`;
  document.getElementById('CRMPost').textContent = `${chat.post}`;
  document.getElementById('CRMEmail').textContent = `${chat.Email}`;
  document.getElementById('CRMEmail').href = `mailto:${chat.Email}`;
  // document.getElementById('CRMPhoneText').textContent = `Phone: `;
  document.getElementById('CRMPhone').textContent = `${chat.Phone}`;
  document.getElementById('CRMPhone').href = `tel:${chat.Phone}`;
  document.getElementById('CRMAddress').textContent = `${chat.address}`;
}

// チャットアイテムにクリックイベントを追加
function addChatItemEventListeners() {
  const chatItems = document.querySelectorAll('.chat-item');
  chatItems.forEach((item) => {
    item.addEventListener('click', handleChatClick);
  });
}

// 初期化
addChatItemEventListeners();

function openPreviewContent() {
  const imgSrc = document.getElementById('preview-img').src;
  window.open(imgSrc, '_blank', 'noopener noreferrer');
}

function closePreview() {
  document.getElementById('preview').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  const messageElements = document.querySelectorAll('.div11');

  messageElements.forEach((element) => {
    truncateText(element, 2); // 2行に制限
  });

  window.addEventListener('resize', function () {
    messageElements.forEach((element) => {
      truncateText(element, 2);
    });
  });
});

function truncateText(element, maxLines) {
  const computedStyle = window.getComputedStyle(element);
  const lineHeight = parseFloat(computedStyle.lineHeight);
  const maxHeight = lineHeight * maxLines;

  element.style.maxHeight = maxHeight + 'px';
  element.style.overflow = 'hidden';
  element.style.textOverflow = 'ellipsis';

  if (element.scrollHeight > maxHeight) {
    let text = element.textContent;
    while (element.scrollHeight > maxHeight) {
      text = text.slice(0, -1); // 1文字ずつ削る
      element.textContent = text + '...';
    }
  }
}

// const chatMenu = 'chatMenu'; // 監視する要素のIDを指定（実際のIDに変更）

// // 処理済みの要素を追跡
// const processedElements = new Set();

// const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//         const targetElement = mutation.target;

//         // 表示されるタイミングでのみ処理を行う
//         const displayStyle = getComputedStyle(targetElement).display;

//         if (displayStyle !== "none" && !processedElements.has(targetElement)) {
//             console.log("✅ Element is now visible. Applying truncateText...");

//             // 処理を実行して、処理済みとして記録
//             processedElements.add(targetElement);

//             // 描画が完了するのを待ってから遅延実行
//             setTimeout(() => {
//                 requestAnimationFrame(() => {
//                     console.log("🚀 Executing truncateText on:", targetElement);
//                     truncateText(targetElement, 2); // 2行に制限
//                 });
//             }, 100); // 100ms 遅らせて実行
//         }
//     });
// });

// // 要素が表示される変化を監視
// const targetElement = document.getElementById(chatMenu);
// if (targetElement) {
//     observer.observe(targetElement, {
//         attributes: true, // 属性が変わったときに監視
//         attributeFilter: ["style"], // style属性のみを監視
//     });
// }

// // メッセージのテキストを高さに合わせて切り詰め、必要であれば「...」を追加
// function truncateText(element, maxLines) {
//     const computedStyle = window.getComputedStyle(element);
//     const lineHeight = parseFloat(computedStyle.lineHeight);
//     const maxHeight = lineHeight * maxLines;

//     if (!element.dataset.originalText) {
//         element.dataset.originalText = element.textContent;
//     }

//     let text = element.dataset.originalText;
//     element.textContent = text;

//     // 高さが最大行数を超えている場合に省略処理
//     if (element.scrollHeight > maxHeight) {
//         console.log(`📝 Truncating text for element: ${element.textContent}`);
//         while (element.scrollHeight > maxHeight) {
//             text = text.slice(0, -1); // 1文字ずつ削除
//             element.textContent = text + "..."; // 末尾に「...」を追加
//         }
//     }
// }

// 後で
// 差し込みタブの項目取得
// チャンネル
// テンプレート
