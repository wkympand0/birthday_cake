const sky = document.body;
const images = ['images/balloon_dark_blue.png', 'images/balloon_light_blue.png'];
const MAX_BALLOONS = 10;

// カウントダウン
function showRestTime() {
    const now = new Date();
    const goal = new Date(2025, 10, 12);
    const rest = goal.getTime() - now.getTime();

    if (rest <= 0) {

        document.querySelector(".start").textContent = null;
        const timerEl = document.querySelector(".timer");
        timerEl.innerHTML = `
        <span style="font-size: 1.5em;">Happy Birthday</span>
        <span style="font-size: 1.5em;"><br>Ryoma</span>
    `;
        return;
    }

    const day = Math.floor(rest / 1000 / 60 / 60 / 24);
    const hour = Math.floor(rest / 1000 / 60 / 60) % 24;
    const minute = Math.floor(rest / 1000 / 60) % 60;
    const second = Math.floor(rest / 1000) % 60;

    document.getElementById("day").textContent = day;
    document.getElementById("hour").textContent = hour;
    document.getElementById("minute").textContent = String(minute).padStart(2, "0");
    document.getElementById("second").textContent = String(second).padStart(2, "0");
}
showRestTime();
setInterval(showRestTime, 1000);

// 風船生成
function rand(min, max) { return Math.random() * (max - min) + min; }

function createBalloon() {
    const img = document.createElement('img');
    img.src = images[Math.floor(Math.random() * images.length)];
    img.className = 'balloon';

    // 横位置を画面外左右も含めてランダム
    img.style.left = rand(-10, 100) + 'vw';

    // サイズ
    const size = rand(100, 190);
    img.style.width = size + 'px';

    sky.appendChild(img);

    // Anime.jsでゆっくり上昇＋横揺れ
    anime({
        targets: img,
        translateX: rand(-30, 30),        // 横揺れ
        translateY: -667 - 1500,          // 画面上外まで
        scale: rand(1.0, 2.0),           // サイズ変化
        duration: rand(9000, 10000),    // 20〜30秒で上昇
        easing: 'easeOutSine',
        complete: () => img.remove()
    });

    // 最大数制御
    const balloons = document.querySelectorAll('.balloon');
    if (balloons.length > MAX_BALLOONS) balloons[0].remove();
}

// 生成間隔 1秒ごと
setInterval(createBalloon, 1000);
const clickLetter = document.getElementById('letter');
const popupWrapper = document.getElementById('popup-wrapper');
const closeBtn = document.getElementById('close');

// 手紙をクリック → ポップアップ表示
clickLetter.addEventListener('click', () => {
    popupWrapper.style.display = "block";
});

// 外側または✕をクリック → 閉じる
popupWrapper.addEventListener('click', e => {
    if (e.target.id === popupWrapper.id || e.target.id === closeBtn.id) {
        popupWrapper.style.display = 'none';
    }
});

const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');

// 最初は一度だけクリックで再生許可（iPhoneなど対策）
document.body.addEventListener('click', () => {
    if (music.paused) {
        music.play().catch(err => console.log("再生できません:", err));
    }
}, { once: true });

// ボタンで再生・停止を切り替え
toggleBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        toggleBtn.textContent = "♫";
    } else {
        music.pause();
        toggleBtn.textContent = "♫";
    }
});

const gift = document.getElementById("gift");
const videoWrapper = document.getElementById("video-popup-wrapper");
const videoClose = document.getElementById("video-close");
const video = document.getElementById("popup-video");

// gift画像をクリック → 動画再生
gift.addEventListener("click", () => {
    videoWrapper.style.display = "flex"; // ポップアップ表示
    video.play();
});

// 閉じるボタンで動画停止＆非表示
videoClose.addEventListener("click", () => {
    video.pause();
    video.currentTime = 0;
    videoWrapper.style.display = "none";
});