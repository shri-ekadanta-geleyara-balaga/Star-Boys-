import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAR0ed_Xfvw6_hF21uwEU2NpO2-Cts_A0k",
  authDomain: "star-boys-1d890.firebaseapp.com",
  projectId: "star-boys-1d890",
  storageBucket: "star-boys-1d890.firebasestorage.app",
  messagingSenderId: "718247990043",
  appId: "1:718247990043:web:d257a07140070d568b79be"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Admin login
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;
  const message = document.getElementById('loginMessage');

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (user.email === "santudilee123@gmail.com") {
      document.getElementById('adminPanel').style.display = "block";
      message.innerText = "Login successful ✅";
    } else {
      await signOut(auth);
      message.innerText = "You are not authorized ❌";
    }
  } catch (error) {
    message.innerText = "Login failed ❌";
    console.error(error);
  }
});

onAuthStateChanged(auth, (user)=>{
  if(user && user.email==="santudilee123@gmail.com"){
    document.getElementById('adminPanel').style.display="block";
  } else {
    document.getElementById('adminPanel').style.display="none";
  }
});

window.adminLogout = async ()=>{
  await signOut(auth);
  document.getElementById('loginMessage').innerText="Logged out";
  document.getElementById('adminPanel').style.display="none";
};
