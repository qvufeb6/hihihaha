const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const opening = $("#opening"), experience = $("#experience"), envelope = $("#envelope");
let experienceOpened = false, giftOpened = false, musicOn = false;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Decorative falling petals and tiny stars.
const petalsRoot = $("#petals"), starsRoot = $("#stars");
if (!reduceMotion) {
  for (let i = 0; i < 28; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = Math.random() * 100 + "%";
    petal.style.animationDuration = (12 + Math.random() * 17) + "s";
    petal.style.animationDelay = (-Math.random() * 25) + "s";
    petal.style.setProperty("--drift", (Math.random() * 220 - 110) + "px");
    petal.style.opacity = (0.18 + Math.random() * 0.58).toFixed(2);
    petal.style.transform = `scale(${.45 + Math.random() * .85})`;
    petalsRoot.appendChild(petal);
  }
  for (let i = 0; i < 65; i++) {
    const star = document.createElement("span");
    star.className = "star-point";
    star.textContent = Math.random() > .55 ? "✦" : "·";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.fontSize = (7 + Math.random() * 11) + "px";
    star.style.animationDelay = Math.random() * 4 + "s";
    star.style.animationDuration = (2 + Math.random() * 4) + "s";
    starsRoot.appendChild(star);
  }
  setInterval(() => {
    const shooting = document.createElement("span");
    shooting.className = "shooting-star";
    shooting.style.left = (55 + Math.random() * 40) + "%";
    shooting.style.top = (Math.random() * 35) + "%";
    starsRoot.appendChild(shooting);
    setTimeout(() => shooting.remove(), 1500);
  }, 6500);
}

function beginExperience() {
  if (experienceOpened) return;
  experienceOpened = true;
  envelope.classList.add("open");
  setTimeout(() => {
    opening.classList.add("fade-out");
    setTimeout(() => {
      opening.classList.add("hidden");
      experience.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      burstSparkles(100);
    }, reduceMotion ? 20 : 650);
  }, reduceMotion ? 10 : 620);
}
$("#envelope").addEventListener("click", beginExperience);
$("#openGiftExperience").addEventListener("click", beginExperience);

const modal = $("#modal");
function showModal(title, message, icon = "♡", kicker = "GỬI MẸ") {
  $("#modalTitle").textContent = title;
  $("#modalMessage").textContent = message;
  $("#modalIcon").textContent = icon;
  $("#modalKicker").textContent = kicker;
  modal.classList.remove("hidden");
  $("#closeModal").focus();
}
function closeModal() { modal.classList.add("hidden"); }
$("#closeModal").addEventListener("click", closeModal);
$("#modalOkay").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

$("#readLetter").addEventListener("click", () => $("#letter").scrollIntoView({behavior: reduceMotion ? "auto" : "smooth"}));
$("#jumpFlowers").addEventListener("click", () => $("#garden").scrollIntoView({behavior: reduceMotion ? "auto" : "smooth"}));

$$(".garden-flower").forEach(button => {
  button.addEventListener("click", () => {
    showModal(button.dataset.title, button.dataset.message, button.querySelector(".flower-head").textContent, "MỘT BÔNG HOA DÀNH CHO MẸ");
    burstSparkles(24);
  });
});

// Interactive botanical garden: each flower opens a short, personal wish.
$$(".botanical-card").forEach(button => {
  button.addEventListener("click", () => {
    showModal(button.dataset.title, button.dataset.message, "✿", "VƯỜN HOA THÁNG MƯỜI");
    burstSparkles(22);
  });
});

// Canvas sparkle/confetti particles, with no external dependency.
const canvas = $("#particles"), ctx = canvas.getContext("2d");
let particles = [], frameActive = false;
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener("resize", resizeCanvas); resizeCanvas();
function burstSparkles(count = 45) {
  if (reduceMotion) return;
  const colors = ["#f3d7a1", "#f6a8c1", "#fff4e8", "#d56c94", "#e9b4d0"];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: innerWidth * (.22 + Math.random() * .56),
      y: innerHeight * (.24 + Math.random() * .34),
      vx: (Math.random() - .5) * 7,
      vy: -2.5 - Math.random() * 6,
      gravity: .09 + Math.random() * .09,
      size: 1.5 + Math.random() * 4.5,
      life: 55 + Math.random() * 55,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 6.28,
      rotationSpeed: (Math.random() - .5) * .18
    });
  }
  if (!frameActive) { frameActive = true; requestAnimationFrame(drawParticles); }
}
function drawParticles() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles = particles.filter(p => p.life > 0);
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.rotation += p.rotationSpeed; p.life--;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
    ctx.globalAlpha = Math.min(1, p.life / 18); ctx.fillStyle = p.color;
    ctx.shadowBlur = 8; ctx.shadowColor = p.color;
    ctx.beginPath(); ctx.moveTo(0, -p.size); ctx.lineTo(p.size * .65, 0); ctx.lineTo(0, p.size); ctx.lineTo(-p.size * .65, 0); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  if (particles.length) requestAnimationFrame(drawParticles);
  else { frameActive = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}

let toastTimer;
function toast(message) {
  const node = $("#toast");
  node.textContent = message; node.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove("show"), 2600);
}

// Background music is a local MP3 supplied by the site owner in assets/nhac-nen.mp3.
async function startMusic() {
  const player = $("#backgroundMusic");
  player.volume = 0.28;
  try {
    await player.play();
    musicOn = true;
    $("#musicToggle").classList.add("playing");
    $("#musicText").textContent = "Tắt nhạc";
  } catch (error) {
    musicOn = false;
    $("#musicToggle").classList.remove("playing");
    $("#musicText").textContent = "Bật nhạc";
    toast("Hãy thêm file assets/nhac-nen.mp3 để bật nhạc nền.");
  }
}
function stopMusic() {
  const player = $("#backgroundMusic");
  player.pause();
  player.currentTime = 0;
  musicOn = false;
  $("#musicToggle").classList.remove("playing");
  $("#musicText").textContent = "Bật nhạc";
}
$("#musicToggle").addEventListener("click", () => musicOn ? stopMusic() : startMusic());

// A restrained closing flourish for the final greeting.
$("#finaleButton").addEventListener("click", () => {
  burstSparkles(55);
  showModal("Chúc mẹ ngày 20/10 vui vẻ", "Chúc mẹ luôn mạnh khỏe, nhiều niềm vui và có thêm thời gian cho những điều mẹ yêu thích. Cảm ơn mẹ vì sự quan tâm và những điều mẹ làm cho gia đình mỗi ngày.", "✿", "LỜI CHÚC NGÀY 20/10");
});

$("#replay").addEventListener("click", () => {
  closeModal(); stopMusic(); experienceOpened = false; giftOpened = false;
  experience.classList.add("hidden");
  opening.classList.remove("hidden", "fade-out");
  envelope.classList.remove("open");
  window.scrollTo({top: 0, behavior: reduceMotion ? "auto" : "smooth"});
});
