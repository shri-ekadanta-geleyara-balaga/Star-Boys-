// 🎵 Music Control
const music = document.getElementById('bgMusic');
window.playMusic = () => { music.volume = 0.2; music.play(); };
window.stopMusic = () => { music.pause(); };

// 🌟 Particles Animation
tsParticles.load("particles-js", {
  fpsLimit: 60,
  particles: {
    number: { value: 50 },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.3 },
    size: { value: { min: 1, max: 3 } },
    move: { enable: true, speed: 1, direction: "none", outModes: "out" }
  },
  interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } }
});

// 🎉 Festival Year Counter
function updateFestivalYear() {
  const startYear = 2005;
  const currentDate = new Date();
  const festivalThisYear = new Date(currentDate.getFullYear(), 8, 10); // placeholder Sep 10
  let yearCount = currentDate.getFullYear() - startYear + 1;
  if (currentDate < festivalThisYear) yearCount -= 1;
  document.getElementById("festivalYear").innerText = yearCount;
}
updateFestivalYear();

// 🌐 Open pages (Photos/Videos)
window.openPage = function(page) {
  window.location.href = page;
};
