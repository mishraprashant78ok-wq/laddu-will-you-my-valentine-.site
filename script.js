 /* ---------- MUSIC ---------- */
let musicStarted = false;
function startMusic() {
    if (!musicStarted) {
        bgMusic.volume = 0.4;
        bgMusic.play();
        musicStarted = true;
    }
}

/* ---------- HEARTS (CONTINUOUS) ---------- */
function spawnHeart() {
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = (6 + Math.random() * 4) + "s";
    document.querySelector(".hearts").appendChild(h);
    setTimeout(() => h.remove(), 10000);
}
setInterval(spawnHeart, 300);

/* ---------- NO BUTTON ---------- */
const messages = [
    "Are you sure?",
    "Really sure??",
    "Think again 💗",
    "I’ll be sad 🥺",
    "Say yes ❤️"
];
let msgIndex = 0;

function handleNoClick() {
    startMusic();

    const noBtn = document.querySelector(".no-button");

    noBtn.textContent = messages[msgIndex];
    msgIndex = (msgIndex + 1) % messages.length;

    const padding = 20;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    noBtn.style.left = Math.random() * maxX + padding + "px";
    noBtn.style.top  = Math.random() * maxY + padding + "px";
}

/* ---------- ROMANTIC CELEBRATION ---------- */
const canvas = document.getElementById("celebration");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let celebrating = false;

function heartFirework(x, y) {
    const parts = [];
    for (let t = 0; t < Math.PI * 2; t += 0.15) {
        const r = 16 * Math.pow(Math.sin(t), 3);
        const px = r;
        const py = -(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
        parts.push({ x, y, vx: px*0.5, vy: py*0.5, life: 80 });
    }

    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        parts.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            ctx.fillStyle = `rgba(255,77,109,${p.life/80})`;
            ctx.beginPath();
            ctx.arc(p.x,p.y,3,0,Math.PI*2);
            ctx.fill();
        });
        if (parts.some(p => p.life > 0)) requestAnimationFrame(animate);
    }
    animate();
}

function startCelebration() {
    if (celebrating) return;
    celebrating = true;

    setInterval(() => {
        heartFirework(
            Math.random() * canvas.width,
            Math.random() * canvas.height * 0.5
        );
    }, 900);
}

/* ---------- YES BUTTON ---------- */
function handleYesClick() {
    startMusic();
    startCelebration();

    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 4000);
}
