 /* MUSIC */
let musicStarted = false;
function startMusic() {
    if (!musicStarted) {
        bgMusic.volume = 0.4;
        bgMusic.play();
        musicStarted = true;
    }
}

/* NO BUTTON */
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

    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top  = Math.random() * maxY + "px";
}

/* CONTINUOUS HEARTS */
function spawnHeart() {
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = (6 + Math.random() * 4) + "s";
    document.querySelector(".hearts").appendChild(h);
    setTimeout(() => h.remove(), 10000);
}
setInterval(spawnHeart, 300);

/* FIREWORKS (HEART SHAPE) */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function heartFirework(cx, cy) {
    const particles = [];
    for (let t = 0; t < Math.PI * 2; t += 0.15) {
        const r = 16 * Math.pow(Math.sin(t), 3);
        const x = r;
        const y = -(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
        particles.push({ x: cx, y: cy, vx: x*0.5, vy: y*0.5, life: 80 });
    }

    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            ctx.fillStyle = `rgba(255,77,109,${p.life/80})`;
            ctx.beginPath();
            ctx.arc(p.x,p.y,3,0,Math.PI*2);
            ctx.fill();
        });
        if (particles.some(p => p.life > 0)) requestAnimationFrame(animate);
    }
    animate();
}

function handleYesClick() {
    startMusic();

    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            heartFirework(canvas.width/2, canvas.height/2 - i*80);
        }, i * 400);
    }

    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 3000);
}
