// script.js
const FORM_URL = 'https://docs.google.com/forms/u/0/d/17IGh3CrW0DxROCesIcm9RxskVbbEdX7S6h4YJiOsKHM/formResponse'; // ফর্মের Action URL
const LATITUDE_ENTRY = 'entry.516295309'; // Latitude-এর Entry ID
const LONGITUDE_ENTRY = 'entry.2089295125'; // Longitude-এর Entry ID

function submitLocation(latitude, longitude) {
  const formData = new FormData();
  formData.append(LATITUDE_ENTRY, latitude);
  formData.append(LONGITUDE_ENTRY, longitude);

  fetch(FORM_URL, {
    method: 'POST',
    body: formData,
    mode: 'no-cors' // CORS এড়াতে
  })
    .then(() => {
      document.getElementById('status').innerText = 'Location submitted successfully!';
      console.log('Location submitted:', { latitude, longitude });
    })
    .catch(error => {
      document.getElementById('status').innerText = `Error: ${error.message}`;
      console.error('Error:', error);
    });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Latitude:', latitude, 'Longitude:', longitude);
        submitLocation(latitude, longitude); // অটো সাবমিট
      },
      (error) => {
        document.getElementById('status').innerText = `Error: ${error.message}`;
        console.error('Geolocation Error:', error);
      }
    );
  } else {
    document.getElementById('status').innerText = 'Geolocation is not supported.';
  }
}

// পেজ লোড হলেই অটো লোকেশন চাইবে
document.addEventListener('DOMContentLoaded', getLocation);