
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const result = document.getElementById("result");

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    window.location.href = "yes.html";
  });
}

//count for making yes bigger later
let noCount = 0;

if (noBtn && yesBtn) {
  noBtn.addEventListener("click", () => {
    noCount++;

    const card = document.querySelector(".card");
    if (!card) return;

    
    noBtn.style.position = "absolute";

    // Measure sizes
    const btnRect = noBtn.getBoundingClientRect();
    const pad = 12;

    
    const maxX = card.clientWidth - btnRect.width - pad;
    const maxY = card.clientHeight - btnRect.height - pad;

    // Random position within card bounds
    const x = pad + Math.random() * Math.max(pad, maxX);
    const y = pad + Math.random() * Math.max(pad, maxY);

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // Make YES button bigger
    const scale = Math.min(1 + (noCount * noCount) * 0.06, 15.0);
    yesBtn.style.transform = `scale(${scale})`;
  });
}

// Run after page loads
document.addEventListener("DOMContentLoaded", () => {
  const isYesPage = document.body.dataset.page === "yes";
  if (!isYesPage) return;
  confettiBurst(180);
  setInterval(() => confettiBurst(120), 2000);
});

function confettiBurst(count = 150) {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.inset = "0";
  container.style.pointerEvents = "none";
  container.style.overflow = "hidden";
  container.style.zIndex = "9999";
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.style.position = "absolute";
    piece.style.top = "-10px";
    piece.style.left = Math.random() * 100 + "vw";

    piece.style.width = (6 + Math.random() * 6) + "px";
    piece.style.height = (10 + Math.random() * 14) + "px";
    piece.style.borderRadius = "2px";
    piece.style.background = `hsl(${Math.random() * 360}, 90%, 60%)`;

    const fall = 5000 + Math.random() * 4800;
    const drift = (Math.random() * 200 - 100);
    const rotate = (Math.random() * 720 - 360);

    piece.animate(
      [
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${drift}px, 110vh) rotate(${rotate}deg)`, opacity: 1 }
      ],
      { duration: fall, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
    );

    container.appendChild(piece);
    setTimeout(() => piece.remove(), fall + 200);
  }

  setTimeout(() => container.remove(), 2500);
}

