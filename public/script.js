// public/script.js

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3mqrM0WDjXR52Zgk1zobtL9bZ60G2f4o",
  authDomain: "morlum-daily-show-data.firebaseapp.com",
  projectId: "morlum-daily-show-data",
  storageBucket: "morlum-daily-show-data.appspot.com",
  messagingSenderId: "323716989684",
  appId: "1:323716989684:web:c9d9c108d796ca0afa94a1",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form submission handler
const form = document.getElementById("concertForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Capture form data
  const formData = new FormData(form);
  const concertData = {};
  formData.forEach((value, key) => {
    concertData[key] = value;
  });

  // Add data to Firestore
  db.collection("concerts")
    .add(concertData)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert("Concert data added successfully!");
      form.reset();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});
