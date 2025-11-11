// console.log("Hello World from script.js");

// document.getElementById("message").textContent = "Birthday Cake🐼";
// console.log("Hello World from script.js");

function showRestTime() {
    const now = new Date();
    // 👇 11 = 12月, 10 = 11月（今回は11月12日）
    const goal = new Date(2025, 10, 12);

    const restMillisecond = goal.getTime() - now.getTime();

    if (restMillisecond <= 0) {
        document.querySelector(".timer").textContent = "おめでとう🎉 当日です！";
        return;
    }

    const day = Math.floor(restMillisecond / 1000 / 60 / 60 / 24);
    const hour = Math.floor(restMillisecond / 1000 / 60 / 60) % 24;
    const minute = Math.floor(restMillisecond / 1000 / 60) % 60;
    const second = Math.floor(restMillisecond / 1000) % 60;

    document.getElementById("day").textContent = day;
    document.getElementById("hour").textContent = hour;
    document.getElementById("minute").textContent = String(minute).padStart(2, "0");
    document.getElementById("second").textContent = String(second).padStart(2, "0");
}

// 初回表示＋1秒ごと更新
showRestTime();
setInterval(showRestTime, 1000);


// // 画像要素を取得
// const human = document.getElementById("human");

// // 幅と高さを指定（px や %）
// human.style.width = "500px";
// // human.style.height = "400px";

// // 枠を丸く（円形にするには borderRadius: 50%）
// human.style.borderRadius = "50%";

// // 枠線をつけたい場合（オプション）
// human.style.border = "3px solid #ccc";

// // 影をつけたい場合（オプション）
// human.style.boxShadow = "0 0 10px rgba(66, 109, 219, 0.3)";