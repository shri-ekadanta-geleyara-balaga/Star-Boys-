import { auth } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Dark Mode
const toggleBtn = document.getElementById('darkModeToggle');
toggleBtn.addEventListener('click', () => document.body.classList.toggle('dark-mode'));

// Countdown Timer
const countdownDate = new Date("Sep 10, 2026 10:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if(distance<0) return;
  document.getElementById('days').innerText = Math.floor(distance / (1000*60*60*24));
  document.getElementById('hours').innerText = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
  document.getElementById('minutes').innerText = Math.floor((distance%(1000*60*60))/(1000*60));
  document.getElementById('seconds').innerText = Math.floor((distance%(1000*60))/1000);
}
updateCountdown();
setInterval(updateCountdown,1000);

// Admin Panel Visibility
const adminPanel = document.getElementById('admin-panel');
onAuthStateChanged(auth, (user) => {
  if(user && user.email==="santudilee123@gmail.com") {
    adminPanel.style.display = "block";
  } else {
    adminPanel.style.display = "none";
  }
});

// Music
const bgMusic = document.getElementById('bgMusic');
window.playMusic = () => bgMusic.play();
window.pauseMusic = () => bgMusic.pause();
window.deleteMusic = () => { bgMusic.pause(); bgMusic.src=""; };
