import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Countdown Timer
const countdownDate = new Date("Sep 10, 2026 10:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;
  if (distance < 0) return;

  document.getElementById('days').innerText = Math.floor(distance/(1000*60*60*24));
  document.getElementById('hours').innerText = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
  document.getElementById('minutes').innerText = Math.floor((distance%(1000*60*60))/(1000*60));
  document.getElementById('seconds').innerText = Math.floor((distance%(1000*60))/1000);
}
updateCountdown();
setInterval(updateCountdown,1000);

// Dark Mode Toggle
const toggleBtn = document.getElementById('darkModeToggle');
toggleBtn.addEventListener('click',()=>document.body.classList.toggle('dark-mode'));

// Admin Panel
const adminPanel = document.getElementById('admin-panel');
onAuthStateChanged(auth, user=>{
  if(user && user.email==="santudilee123@gmail.com") adminPanel.style.display="block";
  else adminPanel.style.display="none";
});
window.adminLogout = async ()=>{await signOut(auth);alert("Logged out");};

// Music Controls
const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.2;
window.playMusic = ()=>bgMusic.play();
window.pauseMusic = ()=>bgMusic.pause();
window.deleteMusic = ()=>{ bgMusic.pause(); bgMusic.src=""; };

// Notice Board
window.updateNotice = ()=>{
  const text = document.getElementById('noticeInput').value;
  document.getElementById('noticeText').innerText = text;
};

// Background Particles
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
for(let i=0;i<100;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2+1,
    dx: (Math.random()-0.5)*0.3,
    dy: (Math.random()-0.5)*0.3
  });
}
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x += p.dx; p.y += p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = "rgba(255,215,0,0.3)";
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
