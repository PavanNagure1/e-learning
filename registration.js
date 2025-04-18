import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD2sT5FfYtn3kGoJL6CrqN_swpmzm3Gqk8",
    authDomain: "e-learning-1-b7235.firebaseapp.com",
    projectId: "e-learning-1-b7235",
    storageBucket: "e-learning-1-b7235.appspot.com",
    messagingSenderId: "152862640749",
    appId: "1:152862640749:web:3d3547d72991015a97cd64"
  }; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Select DOM elements
const registerBtn = document.getElementById("registerBtn");

// Register button click event
registerBtn.addEventListener("click", async () => {
  const studentName = document.getElementById("studentName").value.trim();
  const studentEmail = document.getElementById("studentEmail").value.trim();
  const courseSelected = document.getElementById("courseSelect").value;

  if (!studentName || !studentEmail) {
    alert("Please enter both your name and email.");
    return;
  }

  try {
    // Add registration data to Firestore
    await addDoc(collection(db, "registrations"), {
      studentName,
      studentEmail,
      course: courseSelected,
      timestamp: serverTimestamp(),
    });

    alert("You have been successfully registered for the course!");
    
    // Clear form fields after successful registration
    document.getElementById("studentName").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("courseSelect").value = "course1"; // Reset to default course
  } catch (error) {
    console.error("Error registering student: ", error);
    alert("There was an error registering. Please try again.");
  }
});
