import { uploadFile } from "./firebase.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-storage.js";

const countdownDate = new Date("Sep 10, 2026 10:00:00").getTime();
function updateCountdown(){
  const now = new Date().getTime();
  const distance = countdownDate-now;
  if(distance<0){
    document.getElementById('countdown').innerText="Event Started!";
    return;
  }
  document.getElementById('days').innerText = Math.floor(distance/(1000*60*60*24));
  document.getElementById('hours').innerText = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
  document.getElementById('minutes').innerText = Math.floor((distance%(1000*60*60))/(1000*60));
  document.getElementById('seconds').innerText = Math.floor((distance%(1000*60))/1000);
}
updateCountdown();
setInterval(updateCountdown,1000);

/* Dark Mode */
document.getElementById('darkModeToggle').addEventListener('click',()=>{
  document.body.classList.toggle('dark-mode');
});

/* Music Controls */
const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.2;
document.getElementById('playMusicBtn').addEventListener('click',()=>bgMusic.play());
document.getElementById('pauseMusicBtn').addEventListener('click',()=>bgMusic.pause());

/* Admin Login */
document.getElementById('loginBtn').addEventListener('click',()=>{
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;
  const msg = document.getElementById('loginMessage');
  if(email==='santudilee123@gmail.com' && password==='yourpassword'){
    document.getElementById('adminPanel').style.display='block';
    msg.innerText='Login successful ✅';
  } else {
    msg.innerText='Login failed ❌';
  }
});

document.getElementById('logoutBtn').addEventListener('click',()=>{
  document.getElementById('adminPanel').style.display='none';
  document.getElementById('loginMessage').innerText='Logged out';
});

/* Upload Music */
document.getElementById('uploadMusicBtn').addEventListener('click',async ()=>{
  const file = document.getElementById('musicUpload').files[0];
  if(file){
    const url = await uploadFile(file,'audio');
    bgMusic.src = url;
    bgMusic.play();
  }
});

/* Upload Video */
document.getElementById('uploadVideoBtn').addEventListener('click',async ()=>{
  const file = document.getElementById('videoUpload').files[0];
  if(file){
    const url = await uploadFile(file,'videos');
    alert("Video uploaded ✅");
    loadMediaGallery();
  }
});

/* Load all uploaded photos/videos */
async function loadMediaGallery(){
  const storage = getStorage();
  const photoContainer = document.getElementById('photoContainer');
  const videoContainer = document.getElementById('videoContainer');

  const photoListRef = ref(storage,'photos/');
  const videoListRef = ref(storage,'videos/');

  photoContainer.innerHTML=''; videoContainer.innerHTML='';

  const photos = await listAll(photoListRef);
  for(const itemRef of photos.items){
    const url = await getDownloadURL(itemRef);
    const img = document.createElement('img');
    img.src = url;
    img.width = 200;
    photoContainer.appendChild(img);
  }

  const videos = await listAll(videoListRef);
  for(const itemRef of videos.items){
    const url = await getDownloadURL(itemRef);
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.width = 300;
    videoContainer.appendChild(video);
  }
}

loadMediaGallery();
