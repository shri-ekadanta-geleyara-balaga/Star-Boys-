import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAR0ed_Xfvw6_hF21uwEU2NpO2-Cts_A0k",
  authDomain: "star-boys-1d890.firebaseapp.com",
  projectId: "star-boys-1d890",
  storageBucket: "star-boys-1d890.firebasestorage.app",
  messagingSenderId: "718247990043",
  appId: "1:718247990043:web:d257a07140070d568b79be"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const videoGrid = document.getElementById('videoGrid');
const adminPanel = document.getElementById('admin-panel');

onAuthStateChanged(auth, (user) => {
  if (user && user.email === "santudilee123@gmail.com") adminPanel.style.display = "block";
  else adminPanel.style.display = "none";
});

// Upload video
window.uploadVideo = async () => {
  const file = document.getElementById('videoUpload').files[0];
  if(!file) return alert("Select a file first");
  
  const storageRef = ref(storage, `videos/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  
  await addDoc(collection(db, 'videos'), { url, name: file.name });
  alert("Video uploaded ✅");
  loadVideos();
};

// Load videos
export async function loadVideos() {
  videoGrid.innerHTML = '';
  const snapshot = await getDocs(collection(db, 'videos'));
  snapshot.forEach(doc => {
    const vid = document.createElement('video');
    vid.src = doc.data().url;
    vid.controls = true;
    vid.style.width = "350px";
    vid.style.borderRadius = "10px";
    videoGrid.appendChild(vid);
  });
}
loadVideos();
