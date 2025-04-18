
// ✅ Firebase config

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase configuration

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

// Function to post a question
const postQuestion = async () => {
  const title = document.getElementById("questionTitle").value.trim();
  const content = document.getElementById("questionContent").value.trim();
  const author = document.getElementById("userName").value.trim();

  if (title === "" || content === "" || author === "") {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // Add a new document to the "discussion" collection
    await addDoc(collection(db, "discussion"), {
      title: title,
      content: content,
      author: author,
      timestamp: serverTimestamp(), // Adds the current timestamp to the question
    });

    // Clear the input fields after posting
    document.getElementById("questionTitle").value = "";
    document.getElementById("questionContent").value = "";
    document.getElementById("userName").value = "";

    alert("Question posted successfully!");
  } catch (error) {
    console.error("Error posting question: ", error);
    alert("There was an error posting your question.");
  }
};

// Attach the postQuestion function to the button
document.getElementById("postQuestionBtn").addEventListener("click", postQuestion);

// Function to load all questions
const loadPosts = () => {
  const postsRef = collection(db, "discussion");
  const q = query(postsRef, orderBy("timestamp", "desc"));

  onSnapshot(q, (snapshot) => {
    const doubtList = document.getElementById("doubt-list");
    doubtList.innerHTML = ""; // Clear existing content

    snapshot.forEach((doc) => {
      const post = doc.data();
      const postId = doc.id;

      const postElement = document.createElement("div");
      postElement.classList.add("question-container");

      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>Posted by ${post.author} on ${new Date(post.timestamp.seconds * 1000).toLocaleString()}</small>
      `;

      doubtList.appendChild(postElement);
    });
  });
};

// Load posts when the page is loaded
loadPosts();
