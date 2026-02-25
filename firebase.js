// Firebase Modular SDK (v12)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { 
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { 
  getFirestore, doc, getDoc, setDoc, updateDoc 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAR0ed_Xfvw6_hF21uwEU2NpO2-Cts_A0k",
  authDomain: "star-boys-1d890.firebaseapp.com",
  projectId: "star-boys-1d890",
  storageBucket: "star-boys-1d890.firebasestorage.app",
  messagingSenderId: "718247990043",
  appId: "1:718247990043:web:d257a07140070d568b79be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Admin Login & Logout
window.adminLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth,email,password);
    alert("Login successful ✅");
  } catch(e) { alert("Login failed ❌"); console.error(e);}
};

window.adminLogout = async () => {
  await signOut(auth);
  alert("Logged out");
};

// Detect admin
onAuthStateChanged(auth,(user)=>{
  const adminPanel = document.getElementById('admin-panel');
  if(user && user.email==="santudilee123@gmail.com") adminPanel.style.display="block";
  else adminPanel.style.display="none";
});

// Notice update
window.updateNotice = async () => {
  const notice = document.getElementById('noticeInput').value;
  await setDoc(doc(db,'settings','notice'), { text: notice });
  document.getElementById('noticeText').innerText = notice;
};

// Load notice on page
async function loadNotice() {
  const docSnap = await getDoc(doc(db,'settings','notice'));
  if(docSnap.exists()) document.getElementById('noticeText').innerText = docSnap.data().text;
}
loadNotice();
