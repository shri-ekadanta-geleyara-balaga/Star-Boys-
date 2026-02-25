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

const photoGrid = document.getElementById('photoGrid');
const adminPanel = document.getElementById('admin-panel');

// Show admin panel only for admin
onAuthStateChanged(auth, (user) => {
  if (user && user.email === "santudilee123@gmail.com") adminPanel.style.display = "block";
  else adminPanel.style.display = "none";
});

// Upload photo
window.uploadPhoto = async () => {
  const file = document.getElementById('photoUpload').files[0];
  if(!file) return alert("Select a file first");
  
  const storageRef = ref(storage, `photos/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  
  await addDoc(collection(db, 'photos'), { url, name: file.name });
  alert("Photo uploaded ✅");
  loadPhotos();
};

// Load photos
export async function loadPhotos() {
  photoGrid.innerHTML = '';
  const snapshot = await getDocs(collection(db, 'photos'));
  snapshot.forEach(doc => {
    const img = document.createElement('img');
    img.src = doc.data().url;
    img.style.width = "250px";
    img.style.borderRadius = "10px";
    photoGrid.appendChild(img);
  });
}
loadPhotos();
