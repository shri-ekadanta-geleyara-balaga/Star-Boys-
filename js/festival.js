// Countdown Timer
const countdownDate = new Date("Sep 10, 2026 10:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    document.getElementById('countdown').innerText = "Event Started!";
    return;
  }

  document.getElementById('days').innerText = Math.floor(distance / (1000*60*60*24));
  document.getElementById('hours').innerText = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
  document.getElementById('minutes').innerText = Math.floor((distance % (1000*60*60)) / (1000*60));
  document.getElementById('seconds').innerText = Math.floor((distance % (1000*60))/1000);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Particles
const particlesContainer = document.getElementById('particles');
for(let i=0;i<50;i++){
  const p = document.createElement('div');
  p.classList.add('particle');
  p.style.top = Math.random()*100 + '%';
  p.style.left = Math.random()*100 + '%';
  p.style.width = p.style.height = Math.random()*4+2+'px';
  p.style.background = 'rgba(245,197,66,0.3)';
  p.style.position = 'absolute';
  p.style.borderRadius = '50%';
  p.style.animation = `move ${10+Math.random()*10}s linear infinite`;
  particlesContainer.appendChild(p);
}

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', ()=>{
  document.body.classList.toggle('dark-mode');
});

// Background Music
const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.2;
window.playMusic = ()=> bgMusic.play();
window.pauseMusic = ()=> bgMusic.pause();
window.uploadMusic = ()=>{
  const file = document.getElementById('musicUpload').files[0];
  if(file){
    const url = URL.createObjectURL(file);
    bgMusic.src = url;
    bgMusic.play();
  }
}
