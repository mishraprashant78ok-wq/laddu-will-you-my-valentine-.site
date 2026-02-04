 /* ---------- MUSIC ---------- */
let musicStarted = false;
function startMusic() {
    if (!musicStarted) {
        bgMusic.volume = 0.4;
        bgMusic.play();
        musicStarted = true;
    }
}

/* ---------- CONTINUOUS HEARTS ---------- */
function spawnHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (6 + Math.random() * 4) + "s";
    document.querySelector(".hearts").appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}
setInterval(spawnHeart, 300);

/* ---------- NO BUTTON EFFECT ---------- */
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

    // Change text
    noBtn.textContent = messages[msgIndex];
    msgIndex = (msgIndex + 1) % messages.length;

    // Shake + glow effect
    noBtn.classList.remove("shake");
    void noBtn.offsetWidth; // force reflow
    noBtn.classList.add("shake");

    setTimeout(() => {
        noBtn.classList.remove("shake");
    }, 400);
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

function heartFirework(x, y) {
    const particles = [];
    for (let t = 0; t < Math.PI * 2; t += 0.15) {
        const r = 16 * Math.pow(Math.sin(t), 3);
        const px = r;
        const py = -(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
        particles.push({
            x, y,
            vx: px * 0.5,
            vy: py * 0.5,
            life: 80
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            ctx.fillStyle = `rgba(255,77,109,${p.life / 80})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
        if (particles.some(p => p.life > 0)) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

/* ---------- YES BUTTON ---------- */
function handleYesClick() {
    startMusic();

    // Continuous romantic celebration
    setInterval(() => {
        heartFirework(
            Math.random() * canvas.width,
            Math.random() * canvas.height * 0.5
        );
    }, 900);

    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 4000);
}
