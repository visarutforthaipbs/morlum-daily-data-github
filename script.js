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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Initialize the map
var map = L.map("map").setView([16.1, 103.7], 8);

// Add base map layer
L.tileLayer(
  "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=YOUR_API_KEY",
  {
    attribution: "&copy; OpenStreetMap contributors & Thunderforest",
    apikey: "4a98d80f4fbc47d7a4582e9f9dc26709", // Replace with your actual API key
    updateWhenIdle: true,
    updateWhenZooming: false,
    keepBuffer: 2,
  }
).addTo(map);

// Custom marker icon for concerts
var customIcon = L.icon({
  iconUrl: "Asset 55map-icon.svg", // Replace with the path to your custom icon
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [-3, -38],
});

// Function to fetch data from Firebase and plot on the map
function fetchAndPlotConcerts() {
  db.collection("concerts")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const concert = doc.data();
        const lat = concert.lat;
        const lon = concert.lon;
        const bandName = concert.band_name;
        const concertDetails = concert.details;

        // Create popup content
        var popupContent = `
                    <strong>Band Name:</strong> ${bandName || "N/A"}<br>
                    <strong>Details:</strong> ${concertDetails || "N/A"}<br>
                `;

        // Add marker to the map
        L.marker([lat, lon], { icon: customIcon })
          .addTo(map)
          .bindPopup(popupContent);
      });
    })
    .catch((error) => {
      console.error("Error fetching concert data: ", error);
    });
}

// Fetch and plot concerts on map load
fetchAndPlotConcerts();
