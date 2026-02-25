// Dark mode toggle
const toggleBtn = document.getElementById('darkModeToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Countdown Timer
const countdownDate = new Date("Sep 10, 2026 10:00:00").getTime();
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 *24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((distance % (1000*60)) / 1000);

  daysEl.innerText = days;
  hoursEl.innerText = hours;
  minutesEl.innerText = minutes;
  secondsEl.innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Music Controls
const bgMusic = document.getElementById('bgMusic');
export function playMusic() { bgMusic.play(); }
export function pauseMusic() { bgMusic.pause(); }
export function deleteMusic() { bgMusic.pause(); bgMusic.src=""; }
